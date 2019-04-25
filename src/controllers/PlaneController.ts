import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import {
  PlaneInput,
  PlaneIdInput,
  PlaneExtendedInput
} from '../models/PlaneInput';
import {
  PlaneOutput,
  PlaneResultOutput,
  PlaneListOutput
} from '../models/PlaneOutput';
import { Plane } from '../entities/plane';

@SoapService({
  portName: 'PlanePort',
  serviceName: 'PlaneService'
})
export class PlaneController {
  @SoapOperation(PlaneListOutput)
  async list(data: PlaneIdInput): Promise<PlaneListOutput> {
    const planes: Plane[] = await getRepository(Plane)
      .createQueryBuilder('plane')
      .getMany();
    const output = new PlaneListOutput();
    output.result = [];
    planes.map(plane => {
      const planeOutput = new PlaneOutput();
      Object.keys(plane).map(key => (planeOutput[key] = plane[key]));
      output.result.push(planeOutput);
    });
    return output;
  }

  @SoapOperation(PlaneOutput)
  async create(data: PlaneInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane = new Plane();
    const output = new PlaneOutput();
    Object.keys(data).map(key => (plane[key] = data[key]));
    const { identifiers, generatedMaps, raw } = await entityManager.insert(
      Plane,
      plane
    );
    const id = identifiers[identifiers.length - 1].id;
    if (id > 0) {
      Object.keys(plane).map(key => (output[key] = plane[key]));
      output.id = id;
    }
    return output;
  }

  @SoapOperation(PlaneOutput)
  async detail(data: PlaneIdInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane: Plane = await entityManager.findOne(Plane, data.id);
    const output = new PlaneOutput();
    if (plane) {
      Object.keys(plane).map(key => (output[key] = plane[key]));
    }
    return output;
  }

  @SoapOperation(PlaneOutput)
  async update(data: PlaneExtendedInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane = await entityManager.findOne(Plane, data.id);
    const output = new PlaneOutput();
    if (plane) {
      Object.keys(data).map(key => (plane[key] = data[key]));
      await entityManager.update(Plane, plane.id, plane);
      Object.keys(plane).map(key => (output[key] = plane[key]));
    }
    return output;
  }

  @SoapOperation(PlaneResultOutput)
  async delete(data: PlaneIdInput): Promise<PlaneResultOutput> {
    const entityManager = getManager();
    const { raw, affected } = await entityManager.delete(Plane, data.id);
    const output = new PlaneResultOutput();
    output.result = affected === 1 ? 'success' : 'failed';
    return output;
  }
}
