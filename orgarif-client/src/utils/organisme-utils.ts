import { LocalDate } from '../domain/datetime';
import { AddInstanceCommandResponse } from '../generated/command/commands';
import {
  DeliberationId,
  DepartementId,
  InstanceId,
  NatureJuridiqueId,
  RepresentantId,
  SecteurId,
  TypeStructureId
} from '../generated/domain/ids';
import {
  DesignationType,
  InstanceDto,
  ItemStatus,
  OrganismeDto
} from '../generated/domain/organisme';
import { GetOrganismeQueryResponse } from '../generated/query/queries';
import { appContext } from '../services/ApplicationContext';

// TODO naming utils, actions...

const onOrganismeNomChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  nom: string
) =>
  appContext
    .commandService()
    .send({
      objectType: 'UpdateOrganismeNomCommand',
      id: organisme.id,
      nom
    })
    .then(() => {
      setOrganisme({ ...organisme, nom });
    });

const onOrganismeStatusUpdate = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  status: ItemStatus
) =>
  appContext
    .commandService()
    .send({
      objectType: 'UpdateOrganismeStatusCommand',
      id: organisme.id,
      status
    })
    .then(() => {
      setOrganisme({ ...organisme, status });
    });

const onInstanceNomChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId,
  nom: string
): Promise<void> =>
  appContext
    .commandService()
    .send({ objectType: 'UpdateInstanceNomCommand', id: instanceId, nom })
    .then(() => {
      const instances = organisme.instances.map(i => {
        if (i.id === instanceId) {
          return { ...i, nom };
        } else {
          return i;
        }
      });
      setOrganisme({ ...organisme, instances });
    });

const onInstanceStatusChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId,
  status: ItemStatus
) =>
  appContext
    .commandService()
    .send({ objectType: 'UpdateInstanceStatusCommand', id: instanceId, status })
    .then(() => {
      const instances = organisme.instances.map(i => {
        if (i.id === instanceId) {
          return { ...i, status };
        } else {
          return i;
        }
      });
      setOrganisme({ ...organisme, instances });
    });

const onDepartementChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  departementId: DepartementId | undefined
) => {
  setOrganisme({ ...organisme, departementId });
  appContext.commandService().send({
    objectType: 'UpdateOrganismeDepartementCommand',
    id: organisme.id,
    departementId
  });
};

const onNatureJuridiqueChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  natureJuridiqueId: NatureJuridiqueId | undefined
) => {
  setOrganisme({ ...organisme, natureJuridiqueId });
  appContext.commandService().send({
    objectType: 'UpdateOrganismeNatureJuridiqueCommand',
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
  appContext
    .commandService()
    .send({
      objectType: 'UpdateOrganismeSecteurCommand',
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
  appContext
    .commandService()
    .send({
      objectType: 'UpdateOrganismeTypeStructureCommand',
      id: organisme.id,
      typeStructureId: typeStructureId
    });
};

const onNombreRepresentantsChange = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId | undefined,
  nombre: number
) => {
  if (!instanceId) {
    setOrganisme({ ...organisme, nombreRepresentants: nombre });
    appContext.commandService().send({
      objectType: 'UpdateOrganismeNombreRepresentantsCommand',
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
    appContext.commandService().send({
      objectType: 'UpdateInstanceNombreRepresentantsCommand',
      instanceId,
      nombre
    });
  }
};

const addDesignation = async (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  representantId: RepresentantId,
  type: DesignationType,
  position: number,
  startDate: LocalDate | undefined,
  instanceId: InstanceId | undefined
) => {
  await appContext
    .commandService()
    .send({
      objectType: 'AddDesignationCommand',
      representantId,
      type,
      position,
      startDate,
      organismeId: organisme.id,
      instanceId
    });
  // TODO faire mieux ? (penser virer le async)
  // recup de juste repr tire la question des repr d'instance, c'est pas bcp mieux
  return updateOrganisme(organisme, setOrganisme);
};

const addInstance = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  nomInstance: string
) => {
  appContext
    .commandService()
    .send<AddInstanceCommandResponse>({
      objectType: 'AddInstanceCommand',
      nomInstance,
      organismeId: organisme.id
    })
    .then(r => {
      const instance: InstanceDto = {
        id: r.id,
        nom: nomInstance,
        nombreRepresentants: 0,
        presenceSuppleants: false,
        designationRepresentants: [],
        designationSuppleants: [],
        lienDeliberations: [],
        status: 'live'
      };
      setOrganisme({
        ...organisme,
        instances: [...organisme.instances, instance]
      });
    });
};

const onNewLienDeliberation = async (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId | undefined,
  deliberationId: DeliberationId,
  comment: string | undefined
): Promise<void> => {
  await appContext
    .commandService()
    .send({
      objectType: 'AddLienDeliberationCommand',
      organismeId: organisme.id,
      instanceId,
      deliberationId,
      comment
    });
  // plus simple parce qu'on a pas le DeliberationDto pour reconstituer le LienDeliberationDto
  // TODO faire mieux ? (penser virer le async)
  return appContext
    .queryService()
    .send<GetOrganismeQueryResponse>({
      objectType: 'GetOrganismeQuery',
      id: organisme.id
    })
    .then(r => setOrganisme(r.organisme));
};

const onPresenceSuppleantsChange = async (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void,
  instanceId: InstanceId | undefined,
  presenceSuppleants: boolean
): Promise<void> => {
  if (!instanceId) {
    setOrganisme({ ...organisme, presenceSuppleants });
    // TODO return ?
    appContext.commandService().send({
      objectType: 'UpdateOrganismePresenceSuppleantsCommand',
      organismeId: organisme.id,
      presenceSuppleants
    });
  } else {
    const instances = organisme.instances.map(i => {
      if (i.id === instanceId) {
        return { ...i, presenceSuppleants };
      } else {
        return i;
      }
    });
    setOrganisme({ ...organisme, instances });
    // TODO return ?
    appContext
      .commandService()
      .send({
        objectType: 'UpdateInstancePresenceSuppleantsCommand',
        instanceId,
        presenceSuppleants
      });
  }
};

const updateOrganisme = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void
): Promise<void> =>
  appContext
    .queryService()
    .send<GetOrganismeQueryResponse>({
      objectType: 'GetOrganismeQuery',
      id: organisme.id
    })
    .then(r => setOrganisme(r.organisme));

export const organismeActions = (
  organisme: OrganismeDto,
  setOrganisme: (o: OrganismeDto) => void
) => ({
  onOrganismeNomChange: (nom: string) =>
    onOrganismeNomChange(organisme, setOrganisme, nom),
  onOrganismeStatusUpdate: (status: ItemStatus) =>
    onOrganismeStatusUpdate(organisme, setOrganisme, status),
  onInstanceNomChange: (instanceId: InstanceId, nom: string) =>
    onInstanceNomChange(organisme, setOrganisme, instanceId, nom),
  onInstanceStatusChange: (instanceId: InstanceId, status: ItemStatus) =>
    onInstanceStatusChange(organisme, setOrganisme, instanceId, status),
  onDepartementChange: (departementId: DepartementId | undefined) =>
    onDepartementChange(organisme, setOrganisme, departementId),
  onNatureJuridiqueChange: (natureJuridiqueId: NatureJuridiqueId | undefined) =>
    onNatureJuridiqueChange(organisme, setOrganisme, natureJuridiqueId),
  onSecteurChange: (secteurId: SecteurId | undefined) =>
    onSecteurChange(organisme, setOrganisme, secteurId),
  onTypeStructureChange: (typeStructureId: TypeStructureId | undefined) =>
    onTypeStructureChange(organisme, setOrganisme, typeStructureId),
  onNombreRepresentantsChange: (
    instanceId: InstanceId | undefined,
    nombre: number
  ) => onNombreRepresentantsChange(organisme, setOrganisme, instanceId, nombre),
  onAddDesignation: (
    representantId: RepresentantId,
    type: DesignationType,
    position: number,
    startDate: LocalDate | undefined,
    instanceId: InstanceId | undefined
  ) =>
    addDesignation(
      organisme,
      setOrganisme,
      representantId,
      type,
      position,
      startDate,
      instanceId
    ),
  onAddInstance: (nom: string) => addInstance(organisme, setOrganisme, nom),
  onNewLienDeliberation: (
    instanceId: InstanceId | undefined,
    deliberationId: DeliberationId,
    comment: string | undefined
  ) =>
    onNewLienDeliberation(
      organisme,
      setOrganisme,
      instanceId,
      deliberationId,
      comment
    ),
  onPresenceSuppleantsChange: (
    instanceId: InstanceId | undefined,
    presenceSuppleants: boolean
  ) =>
    onPresenceSuppleantsChange(
      organisme,
      setOrganisme,
      instanceId,
      presenceSuppleants
    ),
  updateOrganisme: () => updateOrganisme(organisme, setOrganisme)
});
