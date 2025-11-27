import { Building } from '@domain/entities/building';
import { Classroom } from '@domain/entities/classroom';
import { Laboratory } from '@domain/entities/laboratory';
import { Office } from '@domain/entities/office';

export const dataMock: Building[] = [
  new Building(
    'B1',
    'Edificio L - Laboratorios',
    1,
    [
      new Laboratory(
        'L-1',
        'LAB 1',
        1,
        { latitude: 100, longitude: 100 },
        { width: 100, height: 150 },
        true,
        'Laboratorio 1',
      ),
      new Laboratory(
        'L-2',
        'LAB 2',
        1,
        { latitude: 100, longitude: 280 },
        { width: 100, height: 150 },
        true,
        'Laboratorio 2',
      ),
    ],
    true,
  ),

  // Edificio C - Aulas (Building B2)
  new Building(
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
        'C1', // name
      ),
      new Classroom(
        'C2',
        'Aula C2',
        1,
        { latitude: 420, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C2', // name
      ),
      new Classroom(
        'C3',
        'Aula C3',
        1,
        { latitude: 490, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C3', // name
      ),
      new Classroom(
        'C4',
        'Aula C4',
        1,
        { latitude: 560, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C4', // name
      ),
      new Classroom(
        'C5',
        'Aula C5',
        1,
        { latitude: 630, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'C5', // name
      ),
      new Classroom(
        'C6',
        'Aula C6',
        2,
        { latitude: 350, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C6', // name
      ),
      new Classroom(
        'C7',
        'Aula C7',
        2,
        { latitude: 420, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C7', // name
      ),
      new Classroom(
        'C8',
        'Aula C8',
        2,
        { latitude: 490, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C8', // name
      ),
      new Classroom(
        'C9',
        'Aula C9',
        2,
        { latitude: 560, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C9', // name
      ),
      new Classroom(
        'C10',
        'Aula C10',
        2,
        { latitude: 630, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'C10', // name
      ),
    ],
    true,
  ),

  // Edificio D - Aulas (Building B3)
  new Building(
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
        'D1', // name
      ),
      new Classroom(
        'D2',
        'Aula D2',
        1,
        { latitude: 820, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D2', // name
      ),
      new Classroom(
        'D3',
        'Aula D3',
        1,
        { latitude: 890, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D3', // name
      ),
      new Classroom(
        'D4',
        'Aula D4',
        1,
        { latitude: 960, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D4', // name
      ),
      new Classroom(
        'D5',
        'Aula D5',
        1,
        { latitude: 1030, longitude: 400 },
        { width: 60, height: 60 },
        true,
        'D5', // name
      ),
      new Classroom(
        'D6',
        'Aula D6',
        2,
        { latitude: 750, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D6', // name
      ),
      new Classroom(
        'D7',
        'Aula D7',
        2,
        { latitude: 820, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D7', // name
      ),
      new Classroom(
        'D8',
        'Aula D8',
        2,
        { latitude: 890, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D8', // name
      ),
      new Classroom(
        'D9',
        'Aula D9',
        2,
        { latitude: 960, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D9', // name
      ),
      new Classroom(
        'D10',
        'Aula D10',
        2,
        { latitude: 1030, longitude: 330 },
        { width: 60, height: 60 },
        true,
        'D10', // name
      ),
    ],
    true,
  ),

  // Edificio H - Aulas (Building B4)
  new Building(
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
        'H1', // name
      ),
      new Classroom(
        'H2',
        'Aula H2',
        1,
        { latitude: 820, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H2', // name
      ),
      new Classroom(
        'H3',
        'Aula H3',
        1,
        { latitude: 890, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H3', // name
      ),
      new Classroom(
        'H4',
        'Aula H4',
        1,
        { latitude: 960, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H4', // name
      ),
      new Classroom(
        'H5',
        'Aula H5',
        1,
        { latitude: 1030, longitude: 200 },
        { width: 60, height: 60 },
        true,
        'H5', // name
      ),
      new Classroom(
        'H6',
        'Aula H6',
        2,
        { latitude: 750, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H6', // name
      ),
      new Classroom(
        'H7',
        'Aula H7',
        2,
        { latitude: 820, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H7', // name
      ),
      new Classroom(
        'H8',
        'Aula H8',
        2,
        { latitude: 890, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H8', // name
      ),
      new Classroom(
        'H9',
        'Aula H9',
        2,
        { latitude: 960, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H9', // name
      ),
      new Classroom(
        'H10',
        'Aula H10',
        2,
        { latitude: 1030, longitude: 130 },
        { width: 60, height: 60 },
        true,
        'H10', // name
      ),
    ],
    true,
  ),

  // Edificio M - Cubículos (Building B5)
  new Building(
    'B5',
    'Edificio M - Cubículos',
    1,
    [
      new Office(
        'M1',
        'Cubículo M1',
        1,
        { latitude: 200, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M1', //
      ),
      new Office(
        'M2',
        'Cubículo M2',
        1,
        { latitude: 270, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M2', //
      ),
      new Office(
        'M3',
        'Cubículo M3',
        1,
        { latitude: 340, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M3', //
      ),
      new Office(
        'M4',
        'Cubículo M4',
        1,
        { latitude: 410, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M4', //
      ),
      new Office(
        'M5',
        'Cubículo M5',
        1,
        { latitude: 480, longitude: 650 },
        { width: 60, height: 60 },
        true,
        'M5', //
      ),
      new Office(
        'M6',
        'Cubículo M6',
        1,
        { latitude: 200, longitude: 720 },
        { width: 60, height: 60 },
        true,
        'M6', //
      ),
      new Office(
        'M7',
        'Cubículo M7',
        1,
        { latitude: 480, longitude: 720 },
        { width: 60, height: 60 },
        true,
        'M7', //
      ),
      new Office(
        'M8',
        'Cubículo M8',
        1,
        { latitude: 200, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M8', //
      ),
      new Office(
        'M9',
        'Cubículo M9',
        1,
        { latitude: 480, longitude: 790 },
        { width: 60, height: 60 },
        true,
        'M9', //
      ),
      new Office(
        'M10',
        'Cubículo M10',
        1,
        { latitude: 200, longitude: 860 },
        { width: 60, height: 60 },
        true,
        'M10', //
      ),
      new Office(
        'M11',
        'Cubículo M11',
        1,
        { latitude: 270, longitude: 860 },
        { width: 60, height: 60 },
        true,
        'M11', //
      ),
      new Office(
        'M12',
        'Cubículo M12',
        1,
        { latitude: 340, longitude: 860 },
        { width: 60, height: 60 },
        true,
        'M12', //
      ),
      new Office(
        'M13',
        'Cubículo M13',
        1,
        { latitude: 410, longitude: 860 },
        { width: 60, height: 60 },
        true,
        'M13', //
      ),
      new Office(
        'M14',
        'Cubículo M14',
        1,
        { latitude: 480, longitude: 860 },
        { width: 60, height: 60 },
        true,
        'M14', //
      ),
    ],
    true,
  ),
];
