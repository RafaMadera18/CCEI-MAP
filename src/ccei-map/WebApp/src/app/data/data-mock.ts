import { Building } from "@domain/entities/building";
import { Classroom } from "@domain/entities/classroom";
import { Laboratory } from "@domain/entities/laboratory";
import { Office } from "@domain/entities/office";

export const dataMock: Building[] = [
  new Building(
    "A",
    "Edificio A",
    1,
    [
      new Classroom(
        "A-101",
        "Aula A1",
        0,
        { latitude: 50, longitude: 20 },
        { width: 55, height: 65 },
        true,
        "A1"
      ),

      new Classroom(
        "A-102",
        "Aula A2",
        0,
        { latitude: 120, longitude: 20 },
        { width: 55, height: 65 },
        true,
        "A2"
      ),

      new Office(
        "A-103",
        "Oficina A3",
        0,
        { latitude: 50, longitude: 100 },
        { width: 55, height: 65 },
        true,
        "OF-A3"
      ),

      new Office(
        "A-104",
        "Oficina A4",
        0,
        { latitude: 120, longitude: 100 },
        { width: 55, height: 65 },
        true,
        "OF-A4"
      ),

      new Laboratory(
        "A-LAB-1",
        "Laboratorio de Redes",
        0,
        { latitude: 200, longitude: 160 },
        { width: 120, height: 130 },
        true,
        "Lab Redes"
      ),

      new Office(
        "A-ADM",
        "Administración",
        0,
        { latitude: 200, longitude: 20 },
        { width: 120, height: 130 },
        true,
        "OF-ADM"
      )
    ],
    true
  )
];
