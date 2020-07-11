// REVISIT THIS PROBLEM. IT IS WAAAAAY OFF.

/* First intuition
1. Shortest path so another bfs problem. 
2. The keys and doors add complexity but otherwise problem is a bit like the max area of island.
   So a "grid with implied adjacency list" problem where neighbors for each cell will be four cells -
   top, bottom, left and right.
3. We're not given the start and end coords, so we'll have to traverse the grid once in the beginning to get that info.
   Since we'll be traversing the grid once anyway, we should collect the keys and their coordinates.
   We'll save this info in a hash. Eg. { b: [[0,4], [2,3]], c: [[0,3]] }. Problem says there can be more than
   one key (or door) of the same type so we need to make sure we collect ALL keys of the same time and their coords.
4. After traversing, we know three things — all keys and their locations, the start coords, the end coords. 
5. We'll use a matrix (array of arrays) to keep track of the cells we've visited. We'll also save the "path"
   we've travelled to reach that cell in an array. Eg. [[2,0], [1,0]].
   TODO: Space optimized way to do this would be with a linked list of the path (coords).
6. The rest is just traversing the graph (or grid) with bfs starting from the start coord.
   If we hit a door, we'll get the matching key and the coords the key is present in from our keys hash.
   And check those coords in the visited matrix. If any one of the keys cells has been visited,
   we can go through the door. We'll also ignore waters as we traverse the grid.
7. If we reach the end coord, we return visited at the end cell coords.

First intuition didn't work. Reasons:
1. Forgot constraint "You're allowed to revisit cells" so keeping track
   of visited and only traversing the unvisited didn't work. 

First Refactor:
So I got rid of the 'if visited[row][col]' condition. Issue I ran into:
1. If the cell was a door, it would still check if a matching key was already visited,
   but this didn't work either.
2. If a key was found, it would be visited for ALL paths - even for ones
   that didn't go through the key.
3. Saving the path of coords in the visited matrix doesn't work. Multiple paths will all
   push their coords into the ONE path array per cell.

Second Refactor:
1. So I went on a walk and talked about the problem with Zach, came back to whiteboard, doodled and 
   let it sit for a while.
2. To each cell that I added to the queue, I added another key - path.
   So each cell would have the path that got them there.
3. I still had the issue of checking if key was found in that path. So I added another key - keysInPath
   to the cell object. So if a door is found, first we check if the key exists in keysInPath before
   adding that cell to the queue. 
4. This works but only for TWO test cases. Everything else is 'Time Limit Exceeded'. I think I'm
   missing something on how I'm traversing the paths but I can't think of anything, so I'll leave
   this problem for now. I'm satisfied with how far I got with this problem.

nth Refactor:
1. Fixed bug: checkDoor function. Was skipping 'A'.
2. I'm finding ALL paths and returning the shortest one. At this point, I might as well DFS?
3. Only one test doesn't pass but I'm not too sure about this code. 
*/

function find_shortest_path(grid) {
  const start = findStart(grid),
    visited = new Array(grid.length).fill().map(() => new Array(grid[0].length))

  return bfs(start, grid, visited)
}

function bfs(start, grid, visited) {
  let shortestPathSoFar
  const queue = [
    { row: start[0], col: start[1], path: [start], keysInPath: new Set() }
  ]
  visited[start[0]][start[1]] = 0

  while (queue.length) {
    const { row, col, path, keysInPath } = queue.shift(),
      neighbors = getNeighbors(row, col, grid)

    for (const neighbor of neighbors) {
      const [nRow, nCol] = neighbor,
        cell = grid[nRow][nCol]
      // Edit: First path found WAS NOT always shortest. So try all possible paths and return the first found shortest one.
      if (cell === '+') {
        const currPath = [...path, neighbor]

        if (!shortestPathSoFar) shortestPathSoFar = currPath
        else {
          shortestPathSoFar =
            currPath.length < shortestPathSoFar.length
              ? currPath
              : shortestPathSoFar
        }
        continue
      }

      // Check if cell is door and if it is, check if a key exists in the path
      const isDoor = checkIfDoor(nRow, nCol, grid),
        keyExists = isDoor && doesKeyExistInPath(cell.toLowerCase(), keysInPath)

      // We need to copy the keysInPath set
      const nextKeysInPath = new Set(keysInPath),
        isKey = checkIfKey(nRow, nCol, grid)

      // If cell is key, add the cell or key to the key path
      if (isKey) nextKeysInPath.add(cell)
      /*
      We can only go through land, keys and doors if the key exists.
      For everything else skip
      */

      if (cell === '.' || isKey || keyExists || cell === '@') {
        const prevKeysCount = visited[nRow][nCol]
        visited[nRow][nCol] = nextKeysInPath.size

        if (
          prevKeysCount === undefined ||
          prevKeysCount < nextKeysInPath.size
        ) {
          queue.push({
            row: nRow,
            col: nCol,
            path: [...path, neighbor],
            keysInPath: nextKeysInPath
          })
        }
      } else {
        continue
      }
    }
  }

  return shortestPathSoFar
}

function doesKeyExistInPath(key, keysInPath) {
  return keysInPath.has(key)
}

function checkIfDoor(x, y, grid) {
  const charCode = grid[x].charCodeAt(y)
  if (charCode > 64 && charCode < 91) return true
  return false
}

function checkIfKey(x, y, grid) {
  const charCode = grid[x].charCodeAt(y)
  if (charCode > 96 && charCode < 123) return true
  return false
}

function getNeighbors(x, y, grid) {
  const result = []

  if (y - 1 >= 0) result.push([x, y - 1])
  if (x - 1 >= 0) result.push([x - 1, y])
  // swapping the order of the last two won't pass one test
  if (x + 1 < grid.length) result.push([x + 1, y])
  if (y + 1 < grid[0].length) result.push([x, y + 1])

  return result
}

function findStart(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '@') return [row, col]
    }
  }
}

const tests = [
  [
    ['...B', '.b#.', '@#+.'],
    [
      [2, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 3],
      [2, 3],
      [2, 2]
    ]
  ],
  [
    ['+B...', '####.', '##b#.', 'a...A', '##@##'],
    [
      [4, 2],
      [3, 2],
      [2, 2],
      [3, 2],
      [3, 1],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [2, 4],
      [1, 4],
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1],
      [0, 0]
    ]
  ],
  [
    ['.dj##.f.j#efejj..@e#+G.c.', '.hdI#.#aAghficDe#J.CGa.ba'],
    [
      [0, 17],
      [0, 16],
      [0, 15],
      [0, 14],
      [0, 13],
      [0, 12],
      [1, 12],
      [1, 11],
      [1, 10],
      [1, 9],
      [1, 10],
      [1, 11],
      [1, 12],
      [1, 13],
      [0, 13],
      [0, 14],
      [0, 15],
      [0, 16],
      [0, 17],
      [1, 17],
      [1, 18],
      [1, 19],
      [1, 20],
      [0, 20]
    ]
  ],
  [
    [
      '.BHf.a#.#Cjc.Jhha.##..Cb.e...Fg#Jgi#aabA##.f###ab#cbi#.aFI.##',
      'ec#ch.#.#.iI.d#.DhB#bGh#e##H#g#hd.E.#.h###.#ab....ihj.Cbjfa.#',
      'jDIb.#aj.ai#.ad.f.DfI#Hg#Bgf.D#.ah#.fBa#cfdfH#aD.Jc.j.iefHGcd',
      '#e..Ca#h.i.##hJ#e##.fj.edHc.B.#j#.chj.G.i.d..f#dCdg.iGcgDCcfi',
      'e.#AfJjhgie.fhb.b#.diI.#.h##.Hh.#gd#i..#.cfDcEa.Df.h.Cj.#g#b.',
      '#Fg.c#.DCAdGgCc#e#.f#CbA..A#AdIeahfA#j.aaFaj#hf##i.aeD..#fh.j',
      'B##.a#..aBca#i#.#.dAiajdigg##ddghIi.#.ieaj##bh.ci#h.HdDhifjAa',
      'HcaaEdE...GcbDEha..ii#b##.DCbJ.hfI###HDg#cIhj#fc#Fj.#H#aF#Bdd',
      '.#eighf#f.dghFF..g##dg.ide.bd.Chj###D#B#eb@.#J#C#bg.idD..cf.g',
      '.#hJD..#jead#jba.#.#g.jg.#E.C#B#d.hi.D.d#hI##.B.A#.#hicf#f.#f',
      'j..Ji#.Ci##.CB#he###iA##ab..JaIhibfhI#.##c..b#e.##g#c##GAac#B',
      '.a.de#I.##f#.dae.#.ecfb#HF#bfjF.#A#afH...IE#Df.##.#C#fb.i##fg',
      '.hIdi#.h#a.hh.#fG.gah.hjfajA#acj.G#chFhHIbh...G.h#a#dGHGjbe#.',
      'fGHaaA#I.g...#.hAce.j#j.f##aFf.##Ec.ajD##..cABhgbebIebAC..#.G',
      'gJ####Ja.#ifea.#jD#hb#CdEh##.jHGHdda#.e.c#ig.BAe.HHdf#df#.#a.',
      '.F#dcgigb#agfFHfhhf.gd.HdcFI#h#beJgCcg#Haf.jjf##ddhee..j#.F#D',
      'BfBcd#.#gagb#h#hgDf.gDh##gj..fgiBcc+c.bgC#fdgAfbeeB...e.ffi.#',
      'eh.#d#c#B#g#bgi#H#F.DI.#DJgcH.#fji#Be#G##A#hBJHh.h.dc##G#.b.b',
      'Jg.EaaAiGJ#eDFgbJEbej#.H#.##Ajjca...##.#.#baB###c.bh#.#Hgg#c.',
      '#g.DJ#jhig.A#b.GD.#.aB.a#.#.hh.f#.d##Bb....b#dcd.#fJe.hg#ibdg',
      'b..#jdig.aegjAb#fadA#...AC.dhC...#E####e.iha..BgfB#c#AbIaCA.i',
      '.h#f###d.#dCIc#C#JDbFfega.cbB.bcJHf..gHc#bdCa..#h#.GHG##..#jh'
    ],

    [
      [8, 42],
      [8, 41],
      [8, 40],
      [8, 41],
      [9, 41],
      [10, 41],
      [10, 42],
      [11, 42],
      [12, 42],
      [13, 42],
      [14, 42],
      [15, 42],
      [15, 41],
      [15, 40],
      [15, 39],
      [16, 39],
      [16, 38],
      [16, 37],
      [16, 36],
      [16, 35]
    ]
  ],
  [
    [
      '..............',
      '.a##########B.',
      '.#..........#.',
      '.#.########.#.',
      '.#.#......#.#.',
      '.#.#.a##B.#.#.',
      '.#.#.#.@#.#.#.',
      '.C.#.D.#ad#.#.',
      '.#.B.#....#.#.',
      '.#.#.#####A.#.',
      '.###........#.',
      '.#.bA########.',
      '+#..c.........'
    ],
    [
      [6, 7],
      [6, 6],
      [7, 6],
      [8, 6],
      [8, 7],
      [8, 8],
      [8, 9],
      [7, 9],
      [7, 8],
      [8, 8],
      [8, 7],
      [8, 6],
      [7, 6],
      [7, 5],
      [7, 4],
      [8, 4],
      [9, 4],
      [10, 4],
      [11, 4],
      [12, 4],
      [11, 4],
      [11, 3],
      [11, 4],
      [10, 4],
      [9, 4],
      [8, 4],
      [8, 3],
      [8, 2],
      [7, 2],
      [7, 1],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      [11, 0],
      [12, 0]
    ]
  ],
  [
    [
      'J...b.j#D.Bhcdaj#.#hh#b###eJ.E..',
      'f#iJ.#I.i..###DgB.ij#.e.ii.bhCjG',
      'd#ccjI#B#..f#.h.ch#G.#.JfJf#B#bA',
      '#ie#Igf##J.#.eJhe...eH#idc#aI.fc',
      'h#Ec#c.hf.bei#.dBe.b#.#ehH#Cd#E#',
      'FF.bg##c##dC.A.g.ff#eG#acb#BDCd.',
      '##e#cg.J.Iga.C#JIcHJ..##a#bc###B',
      '.jdg.e#Djjg#..#hhjafbcbfF@.fbJGD',
      '.g#a#B####i..abIH..aB.#.#.bg.#.H',
      'hji.f.cigafgcJ#dE..##eC#d#B#F#Ie',
      'i##..#e.e#####bF.di#De....bG#g#C',
      'd.#.g#D.cg..CJ..BHe#aba#.F#EjE##',
      'gh#g#aEHee##..cE#je.If.#a#G.jiEf',
      'Cfh#Ga.#a.#d#jEjgGjgFfaH.dahfd..',
      'Hc..e.HIfFE#ffhb#Fd.###.b#dB#Jgb',
      'h#FdJ.d.AjE.Ad.BhD.eJj#hfiJBhjgg',
      'b.fbCgjbiidjE.c#Ijd######a..B.aD',
      '##iajj#Eg#f.dg###cFfJ.#i##B#.#Ae',
      '.hf#cgG.GafDb##DgGFab#B#Dd#..##J',
      '.ih.#.hihbEcj..a.jii.#d#dbad#D#C',
      '..g##.FbdH#.#i.#ee.Fj#j..fB.e##e',
      'f#db#hEAjFFcF...Db#fj#ch.H.hhJ#D',
      '##CeBG#cgi.#fig.#e.bHgjCi.a.g#Dh',
      'agaC.b#.a#hgdE.jci#a.f#Jgfh..#ji',
      'HA#eJGJ.GJg.dEh#CeeCB.#dfdg.#F#j',
      '#.##aGdH#ehFb.##fbg..Gjac.jdJ#.d',
      'j#.Db#Ae#B#I.j...e..BjiGc.adfee#',
      'G#A.i.ge#..df.j##c.jh.Hb#A###iaa',
      '#abeeg.dDHA.h#e#g.##i##IaE.#.bhF',
      '.cgH##efiE.i.##cII####..fB.#jdAi',
      'fj.cf.#.cff#bd.gB....hchdgde.Jbj',
      'jfbfa#.#iCa..#Bj#Cc..J..Fg.###Bc',
      '.da#edFa..j.f#j##..e.jJB#aCf.##.',
      '.#DhAeah#gfe#..#.b#Afi.db#Cg.#.A',
      'jgF..#.hiDC#B..AF#H#.##.eD#.BJbe',
      '#de#Gg.dc.ag###F.IIb.#.#.A..a#da',
      '.cb.a#.ed.aA#.fj.h#C#...cj#..eCg',
      'iaaifJi.#jHD#..#hd##c..#.dfj.hfc',
      'g#eb..fIH#Ej+G.ag..Ebhc#cDaGejib'
    ],
    [
      [7, 25],
      [8, 25],
      [8, 26],
      [9, 26],
      [10, 26],
      [10, 25],
      [10, 24],
      [10, 23],
      [10, 22],
      [10, 21],
      [11, 21],
      [12, 21],
      [13, 21],
      [13, 20],
      [13, 19],
      [13, 18],
      [14, 18],
      [14, 17],
      [15, 17],
      [16, 17],
      [17, 17],
      [18, 17],
      [19, 17],
      [20, 17],
      [21, 17],
      [22, 17],
      [23, 17],
      [24, 17],
      [25, 17],
      [26, 17],
      [27, 17],
      [28, 17],
      [29, 17],
      [30, 17],
      [31, 17],
      [32, 17],
      [33, 17],
      [33, 16],
      [34, 16],
      [35, 16],
      [35, 15],
      [36, 15],
      [36, 14],
      [36, 13],
      [37, 13],
      [38, 13],
      [38, 12]
    ]
  ],
  [
    [
      '..H.ai.EJ.cjJchH.hA##i#dhAI.dfad.gg#ij#jgG#fbIjJec#bbadCg.',
      'h.#.h.hg...affci#ie#jf..dH#.b#e#C.aFchh#d...#.#GiHbiijb.jc',
      '#j..c##Ieb.hb#g#..idj#.Bg.eAD.iJ###cdBe..B.##e#.##e.E#B..#',
      'jAe.bgB#EHj#f#.#dee.i##E.hE#igde..D#.f##Gd.#.cc.hde##I#Gb.',
      '#eb.#i.c..Ch#.ejae..J.g#dHabIdfhJJ#efdh.F#DjeEb###Ihfei#i.',
      'Ea#j##fbe..iBaC..a.C.a.##Cfdag.idj.eA.A#AiHd#.c.cIGa#jEf##',
      'fi.JIb##.a##iGgh.hjJei.aa.#bdFh#ja.#HCdfgfEE##.gGebBhEjFg.',
      '##f.gh.hAb###jEe.fgJ#E#d.HDjdafJcfb#..a.JACBdcF.d#.Hf.ege.',
      'i.#b#jC#.c.FE#J#ef.b#Bhcd##b#..G.#ia#.#.f#JDJ#cdI#BG#.acGg',
      'ahhBCd#eC.D##.cDd.e#e.#Bh#gjCF.cBfEaa#FA.#cfah.#jc..#jIH#i',
      'gJh.c#..ed.c.chigFcehIgJ.D.#e#eh.d#iddCG#..aEeF..cgJ#.#eaD',
      'hhabIbgg#....g.eI.j#J.#d.aE.jf..dceagBI.c.#f.#h.FcchF.D#gg',
      'h#b#DJa.d##bI..gghAC##f..b#Fhe.i.D#D#...#cid.GiHJjh.#JfiDd',
      'dBa####gfh.ce##.gc#c.Bb.##eD...c.#.e.E.#A.b##eb##f..##cc#.',
      'b#.#jFhJ#DG#Ci.iee#dBdcCd.h#i##dfAjJd#.adddAcDecj.fcdbgB##',
      '#b.hcbCei.##CjiCai#jgd.fhHa...jc#.faJa.h.Eh#Icdjaeg#.hJIii',
      'Ae.hjbHGEh.H.e#.f##bFg#A.#..gD#bAfIah.Ea#i##...#iad.dBG.h#',
      'Hfe#jibHA..c#G#.###.JgeHei.j.i.EEC..bF#j#d##j.J#AiAdFeh#Gi',
      'Igdc.Ij#iBdgBabheA.DgAhB.BgIJa.ihG.f##iJj.c#g#dB##acJ..#.c',
      '#.f#FA#.g.C#.h.eBg.a##.dIa.gceJf#i#CJeci.#J.I##AgD.e@.He..',
      '.D#c#..d.h#.h#.#.c.#b..hdgijEgeF###eJecc#.#Ae#c.dbaEabBJhg',
      '.###.dEFG#bbha#ba#d.#D#C###deji.BiJj.gEG.#heHfFAb#hfbgC.di',
      '#.#.#.#e#.#b.#hgHigfci#i#FFjD#...a#hAJFfci.eI#ab##h.bDh...',
      'gCfj#faaji.daciaHf.B.ib.i....#Gdebca.##C.#h.##h##i.EdiG.#B',
      '#.hF#.F.#ehGehdg##eFBCcD#.#iab.fDD##a#bb..iaa#gi.#ba#CafgH',
      'hhebc##bhDi###aAI#g#b.#Dc.dgaga#.e##.#g#.IgjD.I#Eb.g.#caDG',
      '#ia#CFa.e#a#g#ddaBje.ihhiab.Gd.c#a.#fa##cJigjg#f.E####b#d#',
      'a.dD..J#f.fGdb##ciB..A...#i#hHgjii.#.#b###ij.E.JH#h..eaf#g',
      '.+djec#hAdCeeiDD.##EeEgf#iaDC#ai#gECJgD#f#ec#jajeAb.bHfe#.',
      '#bdH.H.##gjfEafab#J.F#jD#.di..#Hi#.#I#bD.eJ.#aibGA.a.b####',
      'DC.I..GJ.Fgi.#.H.#.#.gH#.i#ebiHc#iJ#.ghhj#ddjjF#.i.cGDE#.f',
      '.J#fb##.c.#C#b#BH#h.jA.#dAAGhjcB#aIj#e#ifbC.D#GCC#ag#.CJ..',
      '##Aei..b.H#J.E#d#bhjGe.#ja.Da.jcI.eIig.jf##e#aB#i.#.##b.ai',
      'Ea.#djg.##.##j#.ifigHGFa#gA#.aG##.aD.aa#.c.FHHjag#b..ch##.',
      '##c#i#h#dj#.#hb#i#Hje##ahabe.Fc#A.dj#FfJ#.G#gEEfb.ijhfbeCF',
      '.B#db#B#Ec#cCJijF#DfcE##giIfhE.#B.i##Hif#J#..##b.Jcab.fGdi',
      'hIe#c#Fd#.IaAj##ha.#c#c.A.abg#d.eb.jaj.EcC#HjC#Afdf#.I##.#',
      'deb.bB#fc#ja.I.#Giba#.a.e..ieaFh.ed#B#a#Fia#I.dCad#cd..##.',
      '##g#beeag.G#Cd#igH.cDd.g#..dG#.g..#jj.E.gJbh...h..#d..cBDg',
      '.jj#..Fd.#gDDdA.#JhBIjh#c##ahhca#.G#cJ..##hafAfdc#ecf###..',
      '#ADh#Dd.#fiE#.#iEFi#acH.F..gI.F#B#hgh.bf#jFgdHdgg#I#df#c.i',
      'I#gb.hdgfj.JifD#b#cA.F.d#Ifjj.G.deb#C#AgAGciBh.baAjcjGj.B.',
      '#FjafBgIg.B#F.gH#..cdd#Gc..b.Dff..F.#cdGGBE.hIb#C.#ib#Dj#i',
      '#.efhBgf#I.fFDe##F.g.Ih..#.CbH##igjif#eAh.##.fe###icBc.gg.',
      'JajABD#bd#c#h#.D.h#dd..#.##C.age###h.h.Ef##FC#..CD#.b.##.g',
      'GaebADffC#Ej..C.i.fD.#b.IJAff#..#e..#.g#A#g.icA#e#.Hj#iH#i',
      'GhG.a.eg.H.ge..HDhIg.##Aib#..j.##.aB.g#.hffB#eFDjhh.ii.e#.',
      '#Aa#.C###aGi#.g.h.a#a##Gfa.I.c.#bg#g#.#j#HfI#A.#HG.#e..I##',
      '.A.cae.f.FEB#J#chd#c#.#.fe##Ee#jD..gCbHDGgC##Ch#.F.#Cc##Bi',
      '#ibhcgBIh.#eFE#iaA.FCC.ib##f.a#FJf.#DBhj.c#..daH..CebieI#a',
      '#Aa.#dfIf.fHefh.#j..JIhGEd#B.H#E#gjdgbC#iaeGjbe..#.CdHGg#.',
      '#FG#...dgIg.E...B#d.d.gd.#...gbbe.c..agga.g#..DGj#..#i##ei',
      '.h#iG...dfJa.#.B##.FJcbEd.dHcI#fga##b.eige.#.#a#c.hhic#d.#',
      '##b#a###DG.be.#ij#bjIjd.#.#GaiaGcfaEEj###.#Ia.hh##dd#j..g#',
      'C.##fiJafb.bG#da...A...cbd.dDB#f.#b#id#cD.fh#.igf..I#Hf#I#',
      'HddfHBfa#dI#Af#EJ.EiJjf.#FB.Ddd.#ggg.#b.Icf.#..#abHDEh.#ga',
      'BjhJ.gj.#cFi#.gGgd#fBgBcfd.bc.gh.BB#a#.ihd.h#i.#fjgj#D#HDE',
      'b.jgg#ec#.iB##Hgc.I.#CHf#d#G.i.ajdj..cgf##ajfd####f##hH.dD',
      'aB.eei#c##cjh#hhCA##.hj..DG#..fIgFd.#.#jdjabJdf..FifF###Ec',
      'ad#H.I#eej.aJ.jeefj#jh#f#Jdj.hcAJIacjF.#.J#AHgBed.#Gded.F#',
      'Djg.i.gJg.##djh.i.#.##j.fE#.d#ee.#edf.cFCf.#.C..##c#F..Efi',
      'c.##ijf..aiBE.#.#BfdcaA.baFiDc#d.#G#.ah.Ji#jjj#.b#.#C.f.de',
      'd.bb#jja##ig#j.eAbb.d.Jbiieg##.bi#i#J.CbIhih#.#b#.#e#C.A#b',
      'Gc#h.ifbg.Ii#E#hjI#Ji#.Ee.h##CDhg.j#jE.B#jFh.ag#a.bjd##..c',
      '#gGj.jg.dG.IBe#gecd#d.afB.IegeJdbGe#e.jeggA.#cGdb.i.Bja#d#',
      '.G.G..c..######iIDia.b#ifdi.c#D.bD..e.J#adh..#aIcGic#j#c#H',
      '#e#IJcji.##HAb#di.d..#..gb.a.II.#j..iCDEhaj.ae.gj###..#Ajj',
      '.A.C#.BAi.cbfhf.Edh#fccabfid#H.E##.j..H.#..##D##Fc.#Dbag.#',
      '..h.Hbjah.Fad#haeg.A.igcD#.fa#d#a.g#dJ.#.ci#CCigfDgE##.Gc.',
      'FJ..jdbi#i#gDcAc.gh..BIG.#A#.JdGgI#FaGhhgeG#bj.##i.iA#fGGc'
    ],

    [
      [19, 52],
      [19, 51],
      [20, 51],
      [21, 51],
      [21, 50],
      [20, 50],
      [20, 49],
      [20, 48],
      [20, 47],
      [20, 46],
      [21, 46],
      [21, 45],
      [21, 44],
      [21, 43],
      [21, 42],
      [22, 42],
      [22, 41],
      [22, 40],
      [22, 39],
      [22, 38],
      [21, 38],
      [21, 37],
      [21, 36],
      [21, 35],
      [21, 34],
      [21, 33],
      [21, 32],
      [21, 31],
      [21, 30],
      [21, 29],
      [21, 28],
      [21, 27],
      [22, 27],
      [22, 26],
      [22, 25],
      [23, 25],
      [23, 24],
      [23, 23],
      [23, 22],
      [23, 21],
      [23, 20],
      [23, 19],
      [23, 18],
      [23, 17],
      [23, 16],
      [23, 15],
      [23, 14],
      [23, 13],
      [23, 12],
      [23, 11],
      [23, 10],
      [23, 9],
      [23, 8],
      [23, 7],
      [24, 7],
      [25, 7],
      [26, 7],
      [26, 6],
      [26, 5],
      [26, 4],
      [27, 4],
      [27, 3],
      [27, 2],
      [27, 1],
      [28, 1]
    ]
  ],

  [
    [
      'baccbbI##cAd#gaf#hCHdi.#Hc#h#iB.@ga.c#d#j#jGc#gigg#EeBBi..jeH###Jafef#DeaA.##BDii...GA#.fij',
      '...#cFg...F.D..##.ib.a#j.GaGicfg#b..#fhjbF##C.fj.f#af#icg.e..##h###...f.#.ig.h.H#ih#.#..B#.',
      '#.hfc.H#gcjHb.fd.hDbfJ.Hg.#.#.fi.FD#Jhd.#.c.H..#c#aJJ#fGcB#.A.D#g#hGF.A#.#.FFIgJ.jhhCF#.BeH',
      '.AhAd.GJEbH##.bH#f#iGffbbF.ch.f.hB...#.bhd#c#.b.cJeieDi..#g#B#GbHdfJj#f.#abFFb#.d.#J...aID#',
      'IcA#AIh.bdgbaJ.#B#e#.I..e#E..jD#a#JeeFE.C###eCHE.hi.aE#aEh.EI#..#A#d#Db#.j#.E#cFBGb#BBBFj.#',
      'iieeF.A#..e#c.jj#Ce.B##c.i.#I#jd.bJAIAF##diH#IG#Jf#jii.CEIjc###fgg.hF#.bj#baj.C..JfiB#AJ.eg',
      '#ec..A#Jg.F#e.FAj#de#Db.#bbfB#gjcfdf.#J#hcjcBh#ef.cjh#j#.g.j#gfbF.g.IifHB...d.jJdBF.c#.gB.H',
      'cb#abcgjjea.###J##eehh#A..Ji...ceB#a.ag#b.e.B#cDi##.beie..JJ#cDbbEbIHg.Hb###C.ebHe..#cE#fFh',
      '##...hC..a..ge#f.#ige#j#ehHeh.#bIfb#fDbD.CdIB##fgBcjd#c.f.jfgB#cc#a.e#.#F.F##i.jI.##e.a.HjC',
      '#.AB#ddFFG.De#chf.c#CF.C..h#.##bhea.iD#Bh##h#.Bb.#.Gg.fA#he.#.c#Dh.#.gDi..E.jad.hC##cb##h.#',
      'a#.DAjgb#gAc#J.#a.D.j#gcj#dj.fBEcaeJ.#ghiB#cc.#.jC..f#g#..f#fce..AB#BJ#d#JBJjCfgE.c..C.dG+.',
      'hG##hDfeJ.jDJ#.aEe.##..A..#FE#.jB..#giCGjcG..gG.b#.#Ieh.##F.d.ggc.d.IDj#If#gfgdc.dg#b.#i##g',
      'Bfb#..jb.aIbi.#dahh#DEb.IiBja.cgah#hc..F.ich##dagdB#a#ej#.jf.I.DFgf#fIab##Hhec#aig##f.h#jbh',
      '.#.eae.#aEb#cEE.bf..fC.B.hf..E#fcbe##DiI...#HBbF##J.IH#..gb.#abf.fHi#.Aeif#CFJ#fAib#FdjHdag',
      '####.eg.aHdhe.Jg.a.ibjfDE##iAb.D#EbGb#i..J.H#HBaf.fhhIBcdeA.#.g##G#D#C#Ha#.bD.ja#cAf.id.h#H',
      '...e.#.#IA#i#hjfhi....G#.e.g.iC..#j..IF#d.j.iBEgd###ia#bjb.iH#cfh.cF.#d#E.BAbIhad.c##i.aCIc',
      'j.HJbF#.Jbg.eE.i.i#aF#h.C##D.aB#e#.Dg.#f##Gciajb..iDHi#h#jCcjd#CHhg.h.d..JIed.#Fjb......Ddg',
      'Ic.#.f#..##.i#j#Hh#JiIFf.hDbbBahfib.bBa..Cee##jFGfej#..I.h#g.#.cE#fj##F...#H.#b##ej##FgI.c.',
      'fBeDEB#j.IiB#Jf##A.i.Dfj#ehd##c.a.J#..#afjh..GihdeceHgijaAB.HI#..dG.BH.Eb.cfg#dCf..h#fda.J#',
      '.Ea#agi.jd.#.G.#Ji#.c.EbajjIIgBbf.#.j.dJ.C..Cc#Hf#..jfji##.ij#b##.#.j.c.D##jfAeb#Ege.###.a#',
      'B..ciBDedi#i#.i#..aab#c..#.beeE.a#fch.fj.idb.H#.cf.ea#.HGe##.Ac.##hHg.#Gi.hBc..FfH#a.cDaiJi',
      '##cj#fhA.a.hc#gD.#f#h#i#e##f.ijg#.##AJIFBdDh.h.da.j.C#hd.##.A..AgH#e#.#geF#HbebHi.#bE#AD.Ff',
      '.egE###..Cgg####fEf#f#c.#dg##..a.HIaG#g#..#.aef..IcgDJc.I.#i#HAE.e.#bGbjEBA..##b.Hjihb##jEe',
      'DfBjacbiHb.#JFi.#ch.aacbdA#J.Ci#Bc.ihg#Cah.j.Iaa#eh.#.##jhhei.#bbh#.#...#f#eJ##Jgef.gJh....',
      'a.CHI#AeiJ#..Cgfe#i#bJh#.C#C#EB#dhaihb.C.#B#dhGe.#ff#b.eh.....#f#Af##i#aiEb.hiA.#eej..D.###',
      'fd.#BDbAed#dibiEBa#.Hh.h.h.#Cag###ahh#.DJ#fi.#.##HA.gd##I..g...H#.dh.Fd##.baG#IF.#bf#.dea.h',
      '#Cg.Jf.##ic##AaafE.fbIci##..jGa###.bg.j.ea.#.AB#ceFC..#Gch.f.A.ihEcB...bcj#eCfH#.Ge.Ihj.cA.',
      'f.#a#bf#e#...J#..cad#db#.#dD##.d.BF.ib.#.bji.#BcdFf##iDGf#gbHh#gEB#fdJcfd#JHi#F.Ea#be..ga#.',
      '##h#ba##aAh#D.#G.jJha#.j#f.#c..#aD..iDc#.g..h##.#AggH..i.FeC.gbFeHa#aA.a#g..HghJ.#b.j..#.ha',
      '#aFDc#.I.aee.ci..AdaBebA.I#Df.JFE###f#.#e##.iii.##d.Hf#g#b#b.f###bHEEah..Df.iFdgaf#B...cj##',
      '....B#..#F#Bh##IDi#I.bgdG.#g#.hJH.aIF.c.A#bI#jJj.a.d..#b.GCihj#c.hded#jB.##..Hjg.##jjh.g#.d'
    ],
    new Array(78)
  ]
]
// tests
for (const test of tests) {
  const res = find_shortest_path(test[0])
  // console.log(res)
  // console.log(JSON.stringify(res) === JSON.stringify(test[1]))
  console.log(res.length === test[1].length)
  if (res.length !== test[1].length) {
    console.log(test[0].length, '|', res.length, test[1].length)
    // console.log(test[0].length)
    // console.log(test[0])
  }
  console.log('----------')
}
const longTest = [
  [
    '..H.ai.EJ.cjJchH.hA##i#dhAI.dfad.gg#ij#jgG#fbIjJec#bbadCg.',
    'h.#.h.hg...affci#ie#jf..dH#.b#e#C.aFchh#d...#.#GiHbiijb.jc',
    '#j..c##Ieb.hb#g#..idj#.Bg.eAD.iJ###cdBe..B.##e#.##e.E#B..#',
    'jAe.bgB#EHj#f#.#dee.i##E.hE#igde..D#.f##Gd.#.cc.hde##I#Gb.',
    '#eb.#i.c..Ch#.ejae..J.g#dHabIdfhJJ#efdh.F#DjeEb###Ihfei#i.',
    'Ea#j##fbe..iBaC..a.C.a.##Cfdag.idj.eA.A#AiHd#.c.cIGa#jEf##',
    'fi.JIb##.a##iGgh.hjJei.aa.#bdFh#ja.#HCdfgfEE##.gGebBhEjFg.',
    '##f.gh.hAb###jEe.fgJ#E#d.HDjdafJcfb#..a.JACBdcF.d#.Hf.ege.',
    'i.#b#jC#.c.FE#J#ef.b#Bhcd##b#..G.#ia#.#.f#JDJ#cdI#BG#.acGg',
    'ahhBCd#eC.D##.cDd.e#e.#Bh#gjCF.cBfEaa#FA.#cfah.#jc..#jIH#i',
    'gJh.c#..ed.c.chigFcehIgJ.D.#e#eh.d#iddCG#..aEeF..cgJ#.#eaD',
    'hhabIbgg#....g.eI.j#J.#d.aE.jf..dceagBI.c.#f.#h.FcchF.D#gg',
    'h#b#DJa.d##bI..gghAC##f..b#Fhe.i.D#D#...#cid.GiHJjh.#JfiDd',
    'dBa####gfh.ce##.gc#c.Bb.##eD...c.#.e.E.#A.b##eb##f..##cc#.',
    'b#.#jFhJ#DG#Ci.iee#dBdcCd.h#i##dfAjJd#.adddAcDecj.fcdbgB##',
    '#b.hcbCei.##CjiCai#jgd.fhHa...jc#.faJa.h.Eh#Icdjaeg#.hJIii',
    'Ae.hjbHGEh.H.e#.f##bFg#A.#..gD#bAfIah.Ea#i##...#iad.dBG.h#',
    'Hfe#jibHA..c#G#.###.JgeHei.j.i.EEC..bF#j#d##j.J#AiAdFeh#Gi',
    'Igdc.Ij#iBdgBabheA.DgAhB.BgIJa.ihG.f##iJj.c#g#dB##acJ..#.c',
    '#.f#FA#.g.C#.h.eBg.a##.dIa.gceJf#i#CJeci.#J.I##AgD.e@.He..',
    '.D#c#..d.h#.h#.#.c.#b..hdgijEgeF###eJecc#.#Ae#c.dbaEabBJhg',
    '.###.dEFG#bbha#ba#d.#D#C###deji.BiJj.gEG.#heHfFAb#hfbgC.di',
    '#.#.#.#e#.#b.#hgHigfci#i#FFjD#...a#hAJFfci.eI#ab##h.bDh...',
    'gCfj#faaji.daciaHf.B.ib.i....#Gdebca.##C.#h.##h##i.EdiG.#B',
    '#.hF#.F.#ehGehdg##eFBCcD#.#iab.fDD##a#bb..iaa#gi.#ba#CafgH',
    'hhebc##bhDi###aAI#g#b.#Dc.dgaga#.e##.#g#.IgjD.I#Eb.g.#caDG',
    '#ia#CFa.e#a#g#ddaBje.ihhiab.Gd.c#a.#fa##cJigjg#f.E####b#d#',
    'a.dD..J#f.fGdb##ciB..A...#i#hHgjii.#.#b###ij.E.JH#h..eaf#g',
    '.+djec#hAdCeeiDD.##EeEgf#iaDC#ai#gECJgD#f#ec#jajeAb.bHfe#.',
    '#bdH.H.##gjfEafab#J.F#jD#.di..#Hi#.#I#bD.eJ.#aibGA.a.b####',
    'DC.I..GJ.Fgi.#.H.#.#.gH#.i#ebiHc#iJ#.ghhj#ddjjF#.i.cGDE#.f',
    '.J#fb##.c.#C#b#BH#h.jA.#dAAGhjcB#aIj#e#ifbC.D#GCC#ag#.CJ..',
    '##Aei..b.H#J.E#d#bhjGe.#ja.Da.jcI.eIig.jf##e#aB#i.#.##b.ai',
    'Ea.#djg.##.##j#.ifigHGFa#gA#.aG##.aD.aa#.c.FHHjag#b..ch##.',
    '##c#i#h#dj#.#hb#i#Hje##ahabe.Fc#A.dj#FfJ#.G#gEEfb.ijhfbeCF',
    '.B#db#B#Ec#cCJijF#DfcE##giIfhE.#B.i##Hif#J#..##b.Jcab.fGdi',
    'hIe#c#Fd#.IaAj##ha.#c#c.A.abg#d.eb.jaj.EcC#HjC#Afdf#.I##.#',
    'deb.bB#fc#ja.I.#Giba#.a.e..ieaFh.ed#B#a#Fia#I.dCad#cd..##.',
    '##g#beeag.G#Cd#igH.cDd.g#..dG#.g..#jj.E.gJbh...h..#d..cBDg',
    '.jj#..Fd.#gDDdA.#JhBIjh#c##ahhca#.G#cJ..##hafAfdc#ecf###..',
    '#ADh#Dd.#fiE#.#iEFi#acH.F..gI.F#B#hgh.bf#jFgdHdgg#I#df#c.i',
    'I#gb.hdgfj.JifD#b#cA.F.d#Ifjj.G.deb#C#AgAGciBh.baAjcjGj.B.',
    '#FjafBgIg.B#F.gH#..cdd#Gc..b.Dff..F.#cdGGBE.hIb#C.#ib#Dj#i',
    '#.efhBgf#I.fFDe##F.g.Ih..#.CbH##igjif#eAh.##.fe###icBc.gg.',
    'JajABD#bd#c#h#.D.h#dd..#.##C.age###h.h.Ef##FC#..CD#.b.##.g',
    'GaebADffC#Ej..C.i.fD.#b.IJAff#..#e..#.g#A#g.icA#e#.Hj#iH#i',
    'GhG.a.eg.H.ge..HDhIg.##Aib#..j.##.aB.g#.hffB#eFDjhh.ii.e#.',
    '#Aa#.C###aGi#.g.h.a#a##Gfa.I.c.#bg#g#.#j#HfI#A.#HG.#e..I##',
    '.A.cae.f.FEB#J#chd#c#.#.fe##Ee#jD..gCbHDGgC##Ch#.F.#Cc##Bi',
    '#ibhcgBIh.#eFE#iaA.FCC.ib##f.a#FJf.#DBhj.c#..daH..CebieI#a',
    '#Aa.#dfIf.fHefh.#j..JIhGEd#B.H#E#gjdgbC#iaeGjbe..#.CdHGg#.',
    '#FG#...dgIg.E...B#d.d.gd.#...gbbe.c..agga.g#..DGj#..#i##ei',
    '.h#iG...dfJa.#.B##.FJcbEd.dHcI#fga##b.eige.#.#a#c.hhic#d.#',
    '##b#a###DG.be.#ij#bjIjd.#.#GaiaGcfaEEj###.#Ia.hh##dd#j..g#',
    'C.##fiJafb.bG#da...A...cbd.dDB#f.#b#id#cD.fh#.igf..I#Hf#I#',
    'HddfHBfa#dI#Af#EJ.EiJjf.#FB.Ddd.#ggg.#b.Icf.#..#abHDEh.#ga',
    'BjhJ.gj.#cFi#.gGgd#fBgBcfd.bc.gh.BB#a#.ihd.h#i.#fjgj#D#HDE',
    'b.jgg#ec#.iB##Hgc.I.#CHf#d#G.i.ajdj..cgf##ajfd####f##hH.dD',
    'aB.eei#c##cjh#hhCA##.hj..DG#..fIgFd.#.#jdjabJdf..FifF###Ec',
    'ad#H.I#eej.aJ.jeefj#jh#f#Jdj.hcAJIacjF.#.J#AHgBed.#Gded.F#',
    'Djg.i.gJg.##djh.i.#.##j.fE#.d#ee.#edf.cFCf.#.C..##c#F..Efi',
    'c.##ijf..aiBE.#.#BfdcaA.baFiDc#d.#G#.ah.Ji#jjj#.b#.#C.f.de',
    'd.bb#jja##ig#j.eAbb.d.Jbiieg##.bi#i#J.CbIhih#.#b#.#e#C.A#b',
    'Gc#h.ifbg.Ii#E#hjI#Ji#.Ee.h##CDhg.j#jE.B#jFh.ag#a.bjd##..c',
    '#gGj.jg.dG.IBe#gecd#d.afB.IegeJdbGe#e.jeggA.#cGdb.i.Bja#d#',
    '.G.G..c..######iIDia.b#ifdi.c#D.bD..e.J#adh..#aIcGic#j#c#H',
    '#e#IJcji.##HAb#di.d..#..gb.a.II.#j..iCDEhaj.ae.gj###..#Ajj',
    '.A.C#.BAi.cbfhf.Edh#fccabfid#H.E##.j..H.#..##D##Fc.#Dbag.#',
    '..h.Hbjah.Fad#haeg.A.igcD#.fa#d#a.g#dJ.#.ci#CCigfDgE##.Gc.',
    'FJ..jdbi#i#gDcAc.gh..BIG.#A#.JdGgI#FaGhhgeG#bj.##i.iA#fGGc'
  ],

  [
    [19, 52],
    [19, 51],
    [20, 51],
    [21, 51],
    [21, 50],
    [20, 50],
    [20, 49],
    [20, 48],
    [20, 47],
    [20, 46],
    [21, 46],
    [21, 45],
    [21, 44],
    [21, 43],
    [21, 42],
    [22, 42],
    [22, 41],
    [22, 40],
    [22, 39],
    [22, 38],
    [21, 38],
    [21, 37],
    [21, 36],
    [21, 35],
    [21, 34],
    [21, 33],
    [21, 32],
    [21, 31],
    [21, 30],
    [21, 29],
    [21, 28],
    [21, 27],
    [22, 27],
    [22, 26],
    [22, 25],
    [23, 25],
    [23, 24],
    [23, 23],
    [23, 22],
    [23, 21],
    [23, 20],
    [23, 19],
    [23, 18],
    [23, 17],
    [23, 16],
    [23, 15],
    [23, 14],
    [23, 13],
    [23, 12],
    [23, 11],
    [23, 10],
    [23, 9],
    [23, 8],
    [23, 7],
    [24, 7],
    [25, 7],
    [26, 7],
    [26, 6],
    [26, 5],
    [26, 4],
    [27, 4],
    [27, 3],
    [27, 2],
    [27, 1],
    [28, 1]
  ]
]
// const res = find_shortest_path(longTest[0])
// // console.log(res)
// // console.log(JSON.stringify(res) === JSON.stringify(test[1]))
// console.log(res.length, longTest[1].length)
// console.log(res.length === longTest[1].length)
