export const organismes = {
  id: '1',
  nom: 'La Courneuve - Le Bourget - Stains - Dugny',
  departement: {
    nom: 'Essone',
    code: '91'
  },
  secteur: 'Mission locale',
  natureJuridique: 'Association',
  siteWeb: 'https://organismes.fr',
  contact: 'adresse@mail.fr',
  texteJuridique: 'https://organisme.fr/text.pdf',
  representants: {
    ag: [
      {
        id: 10,
        nom: 'Durand',
        prenom: 'Marc',
        dureeMandat: 4,
        photo: '',
        suppleant: {
          nom: 'Dupuis',
          prenom: 'Sophie',
          dureeMandat: 4,
          photo: ''
        }
      },
      {
        id: 11,
        nom: 'Doe',
        prenom: 'John',
        dureeMandat: 4,
        photo: '',
        suppleant: {
          nom: '',
          prenom: '',
          dureeMandat: 0,
          photo: ''
        }
      }
    ],
    ca: [
      {
        id: 12,
        nom: 'Doub',
        prenom: 'Philippe',
        dureeMandat: 4,
        photo: ''
      },
      {
        id: 13,
        nom: 'Dugny',
        prenom: 'Paul',
        dureeMandat: 4,
        photo: ''
      },
      {
        id: 14,
        nom: 'Doe',
        prenom: 'John',
        dureeMandat: 4,
        photo: ''
      }
    ]
  }
};