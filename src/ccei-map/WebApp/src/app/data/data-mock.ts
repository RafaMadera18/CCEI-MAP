import { Building } from '@domain/entities/building';
import { Classroom } from '@domain/entities/classroom';
import { Laboratory } from '@domain/entities/laboratory';
import { Office } from '@domain/entities/office';
import { Graph } from './model/Grafo';
import { BuildingNode } from './model/BuildingNode';
import { IntersectionNode } from './model/IntersectionNode';
import { Connection } from './model/Connection';
import { createStreetsMock } from './streets-mock';

export function GrafoMock(): Graph {
  const grafo = new Graph();

  const edificioL = new Building(
    'B1',
    'Edificio L - Laboratorios',
    1,
    [
      new Laboratory(
        'L-1',
        'LAB 1',
        1,
        { latitude: 80, longitude: 50 },
        { width: 150, height: 100 },
        true,
        'Laboratorio 1',
      ),
      new Laboratory(
        'L-2',
        'LAB 2',
        1,
        { latitude: 80, longitude: 180 },
        { width: 150, height: 100 },
        true,
        'Laboratorio 2',
      ),
      new Laboratory(
        'L-3',
        'LAB 3',
        1,
        { latitude: 80, longitude: 320 },
        { width: 150, height: 100 },
        true,
        'Laboratorio 3',
      ),
    ],
    true,
  );

  const edificioC = new Building(
    'B2',
    'Edificio C - Aulas',
    2,
    [
      new Classroom(
        'C1',
        'Aula C1',
        1,
        { latitude: 350, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C1',
      ),
      new Classroom(
        'C2',
        'Aula C2',
        1,
        { latitude: 420, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C2',
      ),
      new Classroom(
        'C3',
        'Aula C3',
        1,
        { latitude: 490, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C3',
      ),
      new Classroom(
        'C4',
        'Aula C4',
        1,
        { latitude: 560, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C4',
      ),
      new Classroom(
        'C5',
        'Aula C5',
        1,
        { latitude: 630, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C5',
      ),
      new Classroom(
        'C6',
        'Aula C6',
        2,
        { latitude: 350, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C6',
      ),
      new Classroom(
        'C7',
        'Aula C7',
        2,
        { latitude: 420, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C7',
      ),
      new Classroom(
        'C8',
        'Aula C8',
        2,
        { latitude: 490, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C8',
      ),
      new Classroom(
        'C9',
        'Aula C9',
        2,
        { latitude: 560, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C9',
      ),
      new Classroom(
        'C10',
        'Aula C10',
        2,
        { latitude: 630, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C10',
      ),
    ],
    true,
  );

  const edificioD = new Building(
    'B3',
    'Edificio D - Aulas',
    2,
    [
      new Classroom(
        'D1',
        'Aula D1',
        1,
        { latitude: 750, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D1',
      ),
      new Classroom(
        'D2',
        'Aula D2',
        1,
        { latitude: 820, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D2',
      ),
      new Classroom(
        'D3',
        'Aula D3',
        1,
        { latitude: 890, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D3',
      ),
      new Classroom(
        'D4',
        'Aula D4',
        1,
        { latitude: 960, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D4',
      ),
      new Classroom(
        'D5',
        'Aula D5',
        1,
        { latitude: 1030, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D5',
      ),
      new Classroom(
        'D6',
        'Aula D6',
        2,
        { latitude: 750, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D6',
      ),
      new Classroom(
        'D7',
        'Aula D7',
        2,
        { latitude: 820, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D7',
      ),
      new Classroom(
        'D8',
        'Aula D8',
        2,
        { latitude: 890, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D8',
      ),
      new Classroom(
        'D9',
        'Aula D9',
        2,
        { latitude: 960, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D9',
      ),
      new Classroom(
        'D10',
        'Aula D10',
        2,
        { latitude: 1030, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D10',
      ),
    ],
    true,
  );

  const edificioH = new Building(
    'B4',
    'Edificio H - Aulas',
    2,
    [
      new Classroom(
        'H1',
        'Aula H1',
        1,
        { latitude: 750, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H1',
      ),
      new Classroom(
        'H2',
        'Aula H2',
        1,
        { latitude: 820, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H2',
      ),
      new Classroom(
        'H3',
        'Aula H3',
        1,
        { latitude: 890, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H3',
      ),
      new Classroom(
        'H4',
        'Aula H4',
        1,
        { latitude: 960, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H4',
      ),
      new Classroom(
        'H5',
        'Aula H5',
        1,
        { latitude: 1030, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H5',
      ),
      new Classroom(
        'H6',
        'Aula H6',
        2,
        { latitude: 750, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H6',
      ),
      new Classroom(
        'H7',
        'Aula H7',
        2,
        { latitude: 820, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H7',
      ),
      new Classroom(
        'H8',
        'Aula H8',
        2,
        { latitude: 890, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H8',
      ),
      new Classroom(
        'H9',
        'Aula H9',
        2,
        { latitude: 960, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H9',
      ),
      new Classroom(
        'H10',
        'Aula H10',
        2,
        { latitude: 1030, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H10',
      ),
    ],
    true,
  );

  const edificioM = new Building(
    'B5',
    'Edificio M - Cubículos',
    1,
    [
      new Office(
        'M1',
        'Cubículo M1',
        1,
        { latitude: 180, longitude: 580 },
        { width: 60, height: 60 },
        true,
        'M1',
      ),
      new Office(
        'M2',
        'Cubículo M2',
        1,
        { latitude: 250, longitude: 580 },
        { width: 60, height: 60 },
        true,
        'M2',
      ),
      new Office(
        'M3',
        'Cubículo M3',
        1,
        { latitude: 320, longitude: 580 },
        { width: 60, height: 60 },
        true,
        'M3',
      ),
      new Office(
        'M4',
        'Cubículo M4',
        1,
        { latitude: 390, longitude: 580 },
        { width: 60, height: 60 },
        true,
        'M4',
      ),
      new Office(
        'M5',
        'Cubículo M5',
        1,
        { latitude: 460, longitude: 580 },
        { width: 60, height: 60 },
        true,
        'M5',
      ),
      new Office(
        'M6',
        'Cubículo M6',
        1,
        { latitude: 180, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M6',
      ),
      new Office(
        'M7',
        'Cubículo M7',
        1,
        { latitude: 460, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M7',
      ),
      new Office(
        'M8',
        'Cubículo M8',
        1,
        { latitude: 180, longitude: 720 },
        { width: 60, height: 60 },
        true,
        'M8',
      ),
      new Office(
        'M9',
        'Cubículo M9',
        1,
        { latitude: 460, longitude: 720 },
        { width: 60, height: 60 },
        true,
        'M9',
      ),
      new Office(
        'M10',
        'Cubículo M10',
        1,
        { latitude: 180, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M10',
      ),
      new Office(
        'M11',
        'Cubículo M11',
        1,
        { latitude: 250, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M11',
      ),
      new Office(
        'M12',
        'Cubículo M12',
        1,
        { latitude: 320, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M12',
      ),
      new Office(
        'M13',
        'Cubículo M13',
        1,
        { latitude: 390, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M13',
      ),
      new Office(
        'M14',
        'Cubículo M14',
        1,
        { latitude: 460, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M14',
      ),
    ],
    true,
  );

  const edificioN = new Building(
    'B6',
    'Edificio N - Cubículos',
    1,
    [
      new Office(
        'N1',
        'Cubículo N1',
        1,
        { latitude: 180, longitude: 880 },
        { width: 60, height: 60 },
        true,
        'N1',
      ),
      new Office(
        'N2',
        'Cubículo N2',
        1,
        { latitude: 250, longitude: 880 },
        { width: 60, height: 60 },
        true,
        'N2',
      ),
      new Office(
        'N3',
        'Cubículo N3',
        1,
        { latitude: 320, longitude: 880 },
        { width: 60, height: 60 },
        true,
        'N3',
      ),
      new Office(
        'N4',
        'Cubículo N4',
        1,
        { latitude: 390, longitude: 880 },
        { width: 60, height: 60 },
        true,
        'N4',
      ),
      new Office(
        'N5',
        'Cubículo N5',
        1,
        { latitude: 460, longitude: 880 },
        { width: 60, height: 60 },
        true,
        'N5',
      ),
      new Office(
        'N6',
        'Cubículo N6',
        1,
        { latitude: 180, longitude: 950 },
        { width: 60, height: 60 },
        true,
        'N6',
      ),
      new Office(
        'N7',
        'Cubículo N7',
        1,
        { latitude: 460, longitude: 950 },
        { width: 60, height: 60 },
        true,
        'N7',
      ),
      new Office(
        'N8',
        'Cubículo N8',
        1,
        { latitude: 180, longitude: 1020 },
        { width: 60, height: 60 },
        true,
        'N8',
      ),
      new Office(
        'N9',
        'Cubículo N9',
        1,
        { latitude: 460, longitude: 1020 },
        { width: 60, height: 60 },
        true,
        'N9',
      ),
      new Office(
        'N10',
        'Cubículo N10',
        1,
        { latitude: 180, longitude: 1090 },
        { width: 60, height: 60 },
        true,
        'N10',
      ),
      new Office(
        'N11',
        'Cubículo N11',
        1,
        { latitude: 250, longitude: 1090 },
        { width: 60, height: 60 },
        true,
        'N11',
      ),
      new Office(
        'N12',
        'Cubículo N12',
        1,
        { latitude: 320, longitude: 1090 },
        { width: 60, height: 60 },
        true,
        'N12',
      ),
      new Office(
        'N13',
        'Cubículo N13',
        1,
        { latitude: 390, longitude: 1090 },
        { width: 60, height: 60 },
        true,
        'N13',
      ),
      new Office(
        'N14',
        'Cubículo N14',
        1,
        { latitude: 460, longitude: 1090 },
        { width: 60, height: 60 },
        true,
        'N14',
      ),
    ],
    true,
  );

  const streets = createStreetsMock();
  streets.forEach((street) => grafo.addStreet(street));

  grafo.addNode(new BuildingNode('B1', edificioL, { x: 155, y: 200 }));
  grafo.addNode(new BuildingNode('B2', edificioC, { x: 490, y: 365 }));
  grafo.addNode(new BuildingNode('B3', edificioD, { x: 890, y: 365 }));
  grafo.addNode(new BuildingNode('B4', edificioH, { x: 890, y: 165 }));
  grafo.addNode(new BuildingNode('B5', edificioM, { x: 320, y: 685 }));
  grafo.addNode(new BuildingNode('B6', edificioN, { x: 320, y: 985 }));

  // === NODOS DE INTERSECCIONES ===
  grafo.addNode(new IntersectionNode('I1', { x: 280, y: 500 })); // Cruce con street-2
  grafo.addNode(new IntersectionNode('I2', { x: 555, y: 500 })); // Cruce con street-4
  grafo.addNode(new IntersectionNode('I3', { x: 720, y: 500 })); // Cruce con street-3

  grafo.addNode(new IntersectionNode('I4', { x: 720, y: 295 })); // Cruce street-3 vertical con horizontal

  grafo.addNode(new IntersectionNode('I5', { x: 280, y: 300 })); // Punto hacia B1
  grafo.addNode(new IntersectionNode('I6', { x: 720, y: 230 })); // Punto hacia B4
  grafo.addNode(new IntersectionNode('I7', { x: 555, y: 685 })); // Punto hacia B5
  grafo.addNode(new IntersectionNode('I8', { x: 555, y: 850 })); // Punto intermedio hacia B6
  grafo.addNode(new IntersectionNode('I9', { x: 555, y: 985 })); // Punto hacia B6

  // Street-1 (horizontal principal)
  grafo.addConnection(new Connection('I1', 'I2', 275, 'street-1'));
  grafo.addConnection(new Connection('I2', 'I3', 165, 'street-1'));
  grafo.addConnection(new Connection('I3', 'B3', 170, 'street-1'));

  // Street-2 (vertical izquierda)
  grafo.addConnection(new Connection('I5', 'I1', 200, 'street-2'));

  // Conectar B1 con street-2
  grafo.addConnection(new Connection('B1', 'I5', 100));

  // Street-3 (vertical y horizontal derecha)
  grafo.addConnection(new Connection('I6', 'I4', 65, 'street-3'));
  grafo.addConnection(new Connection('I4', 'I3', 205, 'street-3'));
  grafo.addConnection(new Connection('I4', 'B3', 170, 'street-3')); // Horizontal

  // Conectar B4 con street-3
  grafo.addConnection(new Connection('B4', 'I6', 65));

  // Street-4 (vertical central)
  grafo.addConnection(new Connection('I2', 'I7', 185, 'street-4'));
  grafo.addConnection(new Connection('I7', 'I8', 165, 'street-4'));
  grafo.addConnection(new Connection('I8', 'I9', 135, 'street-4'));

  // Conectar edificios M y N con street-4
  grafo.addConnection(new Connection('I7', 'B5', 235));
  grafo.addConnection(new Connection('I9', 'B6', 235));

  // Conectar B2 con street-1
  grafo.addConnection(new Connection('B2', 'I2', 135));

  return grafo;
}
