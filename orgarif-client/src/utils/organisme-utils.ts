import { appContext } from '../ApplicationContext';
import { DropDestination } from '../component/edit/DragAndDropGlobalContext';
import {
  DeliberationId,
  InstanceId,
  NatureJuridiqueId,
  OrganismeId,
  RepresentationId,
  SecteurId,
  TypeStructureId
} from '../domain/ids';
import {
  InstanceDto,
  ItemStatus,
  OrganismeDto,
  RepresentantDto,
  RepresentationDto
} from '../domain/organisme';
import { LocalDate } from '../domain/time';
import { pipe } from './Pipe';

// TODO naming utils, actions...

const onOrganismeNomChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  nom: string,
  then: () => void
) => {
  appContext
    .commandService()
    .updateOrganismeNomCommand({
      id: organisme.id,
      nom
    })
    .then(() => {
      setOrganisme({ ...organisme, nom });
      then();
    });
};

const onOrganismeStatusUpdate = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  status: ItemStatus,
  then: () => void
) => {
  appContext
    .commandService()
    .updateOrganismeStatus({
      id: organisme.id,
      status
    })
    .then(() => {
      setOrganisme({ ...organisme, status });
      then();
    });
};

const onInstanceNomChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId,
  nom: string,
  then: () => void
) => {
  appContext
    .commandService()
    .updateInstanceNomCommand({
      id: instanceId,
      nom
    })
    .then(() => {
      const instances = organisme.instances.map(i => {
        if (i.id === instanceId) {
          return { ...i, nom };
        } else {
          return i;
        }
      });
      setOrganisme({ ...organisme, instances });
      then();
    });
};

const onInstanceStatusChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId,
  status: ItemStatus,
  then: () => void
) => {
  appContext
    .commandService()
    .updateInstanceStatusCommand({
      id: instanceId,
      status
    })
    .then(() => {
      const instances = organisme.instances.map(i => {
        if (i.id === instanceId) {
          return { ...i, status };
        } else {
          return i;
        }
      });
      setOrganisme({ ...organisme, instances });
      then();
    });
};

const onNatureJuridiqueChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  natureJuridiqueId: NatureJuridiqueId | undefined
) => {
  setOrganisme({ ...organisme, natureJuridiqueId });
  appContext.commandService().updateOrganismeNatureJuridiqueCommand({
    id: organisme.id,
    natureJuridiqueId
  });
};

const onSecteurChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  secteurId: SecteurId | undefined
) => {
  setOrganisme({ ...organisme, secteurId });
  appContext.commandService().updateOrganismeSecteurCommand({
    id: organisme.id,
    secteurId: secteurId
  });
};

const onTypeStructureChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  typeStructureId: TypeStructureId | undefined
) => {
  setOrganisme({ ...organisme, typeStructureId });
  appContext.commandService().updateOrganismeTypeStructureCommand({
    id: organisme.id,
    typeStructureId: typeStructureId
  });
};

const onNombreRepresentantsChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId | undefined,
  nombre: number | undefined
) => {
  if (!instanceId) {
    setOrganisme({ ...organisme, nombreRepresentants: nombre });
    appContext.commandService().updateOrganismeNombreRepresentantsCommand({
      id: organisme.id,
      nombre
    });
  } else {
    const instances = organisme.instances.map(i => {
      if (i.id === instanceId) {
        return { ...i, nombreRepresentants: nombre };
      } else {
        return i;
      }
    });
    setOrganisme({ ...organisme, instances });
    appContext.commandService().updateInstanceNombreRepresentantsCommand({
      instanceId,
      nombre
    });
  }
};

const addRepresentation = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  representant: RepresentantDto,
  organismeId: OrganismeId,
  instanceId: InstanceId | undefined
) => {
  appContext
    .commandService()
    .addRepresentationCommand({
      representantId: representant.id,
      organismeId: organismeId,
      instanceId: instanceId
    })
    .then(r => {
      const representation: RepresentationDto = {
        id: r.id,
        representant
      };
      if (!instanceId) {
        const representations = [...organisme.representations, representation];
        setOrganisme({ ...organisme, representations });
      }
    });
};

const representations = (
  organisme: OrganismeDto,
  instanceId: InstanceId | undefined
) =>
  pipe(
    instanceId ? organisme.instances.find(i => i.id === instanceId) : organisme
  )
    .map(i => {
      if (!i) {
        throw Error(`${organisme.id} ${instanceId}`);
      }
      return i.representations;
    })
    .unwrap();

const setRepresentations = (
  organisme: OrganismeDto,
  instanceId: InstanceId | undefined,
  representations: RepresentationDto[]
) => {
  if (!instanceId) {
    return { ...organisme, representations };
  } else {
    const instances = organisme.instances.map(i => {
      if (i.id === instanceId) {
        return { ...i, representations };
      } else {
        return i;
      }
    });
    return { ...organisme, instances };
  }
};

const onMoveRepresentation = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  representationId: RepresentationId,
  source: DropDestination<OrganismeId | InstanceId>,
  destination?: DropDestination<OrganismeId | InstanceId>
) => {
  if (!destination) {
    return;
  }
  const sourceInstanceId =
    source.droppableId !== organisme.id
      ? (source.droppableId as InstanceId)
      : undefined;
  const fromSourceRepresentations = representations(
    organisme,
    sourceInstanceId
  );
  const movedRepresentation = fromSourceRepresentations.find(
    r => r.id === representationId
  );
  if (!movedRepresentation) {
    throw Error(`${representationId}`);
  }
  const sourceRepresentations = fromSourceRepresentations.filter(
    r => r.id !== representationId
  );
  const toInstanceId =
    destination.droppableId !== organisme.id
      ? (destination.droppableId as InstanceId)
      : undefined;
  const destinationRepresentation = [
    ...representations(organisme, toInstanceId)
  ].filter(r => r.id !== movedRepresentation.id);
  destinationRepresentation.splice(destination.index, 0, movedRepresentation);
  setOrganisme(
    pipe(organisme)
      .map(o => setRepresentations(o, sourceInstanceId, sourceRepresentations))
      .map(o => setRepresentations(o, toInstanceId, destinationRepresentation))
      .unwrap()
  );
  appContext
    .commandService()
    .moveRepresentationCommand({
      id: representationId,
      toOrganismeId: organisme.id,
      toInstanceId,
      toPosition: destination.index
    })
    .then(() => {});
};

const addInstance = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  nomInstance: string
) => {
  appContext
    .commandService()
    .addInstanceCommand({ nomInstance, organismeId: organisme.id })
    .then(r => {
      const instance: InstanceDto = {
        id: r.id,
        nom: nomInstance,
        nombreRepresentants: undefined,
        lienDeliberations: [],
        representations: [],
        status: 'live'
      };
      setOrganisme({
        ...organisme,
        instances: [...organisme.instances, instance]
      });
    });
};

const onNewLienDeliberation = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  id: DeliberationId,
  instanceId: InstanceId | undefined
) => {};

const onNewDeliberationAndLien = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  libelle: string,
  deliberationDate: LocalDate,
  instanceId: InstanceId | undefined
) => {};

export const organismeActions = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void
) => ({
  onOrganismeNomChange: (nom: string, then: () => void) =>
    onOrganismeNomChange(organisme, setOrganisme, nom, then),
  onOrganismeStatusUpdate: (status: ItemStatus, then: () => void) =>
    onOrganismeStatusUpdate(organisme, setOrganisme, status, then),
  onInstanceNomChange: (
    instanceId: InstanceId,
    nom: string,
    then: () => void
  ) => onInstanceNomChange(organisme, setOrganisme, instanceId, nom, then),
  onInstanceStatusChange: (
    instanceId: InstanceId,
    status: ItemStatus,
    then: () => void
  ) =>
    onInstanceStatusChange(organisme, setOrganisme, instanceId, status, then),
  onNatureJuridiqueChange: (natureJuridiqueId: NatureJuridiqueId | undefined) =>
    onNatureJuridiqueChange(organisme, setOrganisme, natureJuridiqueId),
  onSecteurChange: (secteurId: SecteurId | undefined) =>
    onSecteurChange(organisme, setOrganisme, secteurId),
  onTypeStructureChange: (typeStructureId: TypeStructureId | undefined) =>
    onTypeStructureChange(organisme, setOrganisme, typeStructureId),
  onNombreRepresentantsChange: (
    instanceId: InstanceId | undefined,
    nombre: number | undefined
  ) => onNombreRepresentantsChange(organisme, setOrganisme, instanceId, nombre),
  onAddRepresentation: (
    representant: RepresentantDto,
    organismeId: OrganismeId,
    instanceId: InstanceId | undefined
  ) =>
    addRepresentation(
      organisme,
      setOrganisme,
      representant,
      organismeId,
      instanceId
    ),
  onMoveRepresentation: (
    representationId: RepresentationId,
    source: DropDestination<OrganismeId | InstanceId>,
    destination?: DropDestination<OrganismeId | InstanceId>
  ) =>
    onMoveRepresentation(
      organisme,
      setOrganisme,
      representationId,
      source,
      destination
    ),
  onAddInstance: (nom: string) => addInstance(organisme, setOrganisme, nom),
  onNewLienDeliberation: (
    id: DeliberationId,
    instanceId: InstanceId | undefined
  ) => onNewLienDeliberation(organisme, setOrganisme, id, instanceId),
  onNewDeliberationAndLien: (
    libelle: string,
    deliberationDate: LocalDate,
    instanceId: InstanceId | undefined
  ) =>
    onNewDeliberationAndLien(
      organisme,
      setOrganisme,
      libelle,
      deliberationDate,
      instanceId
    )
});
