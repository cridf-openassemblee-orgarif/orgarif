const ID = () => {
  // generate random id
  return '_' + Math.random().toString(36).substring(2, 9);
};

export interface Data {
  id: string;
  organisme: string;
  localité: string;
  département: number;
  structure: string;
}

function createData(
  id: string,
  organisme: string,
  localité: string,
  département: number,
  structure: string
): Data {
  return { id, organisme, localité, département, structure };
}

export const originalRows = [
  createData(
    ID(),
    'Maison de l’emploi et de la formation (MEF)',
    'Montreuil',
    92,
    'Mission Locale'
  )
];

for (let index = 0; index < 100; index++) {
  originalRows.push(
    createData(
      ID(),
      'Maison de l’emploi et de la formation (MEF)',
      'Montreuil',
      92,
      'Mission Locale'
    ),
    createData(
      ID(),
      'Maison de l’emploi (ME) de ...',
      'Clichy',
      92,
      'Mission Locale'
    ),
    createData(
      ID(),
      "Plan local pour l'insertion et l'emploi (PLIE) ...",
      'Asnières-sur-Seine',
      92,
      'Mission Locale'
    ),
    createData(
      ID(),
      'Paris Région Entreprises',
      'Levallois-Perret',
      92,
      'Mission Locale'
    ),
    createData(
      ID(),
      "Communuaté d'universités et établissements",
      'Gennevilliers',
      92,
      'Mission Locale'
    ),
    createData(ID(), 'Mission locale (ML)', 'Clichy', 92, 'Mission Locale')
  );
}
