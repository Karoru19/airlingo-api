import { getManager, getRepository } from 'typeorm';
import { SoapService, SoapOperation } from 'soap-decorators';
import { PlaneInput } from '../models/inputs/PlaneInput';
import { PlaneOutput } from '../models/outputs/PlaneOutput';
import { Plane } from '../entities/plane';
import { IdInput } from '../models/inputs/IdInput';
import { ResultOutput } from '../models/outputs/ResultOutput';
import { PlaneListOutput } from '../models/outputs/PlaneListOutput';

@SoapService({
  portName: 'PlanePort',
  serviceName: 'PlaneService'
})
export class PlaneController {
  @SoapOperation(PlaneListOutput)
  async list(data: IdInput): Promise<PlaneListOutput> {
    const planes: Plane[] = await getRepository(Plane)
      .createQueryBuilder('plane')
      .getMany();
    const output = new PlaneListOutput(planes);
    return output;
  }

  @SoapOperation(PlaneOutput)
  async create(data: PlaneInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane = data.toPlane();
    let output = new PlaneOutput();
    const { identifiers } = await entityManager.insert(Plane, plane);
    const id = identifiers[identifiers.length - 1].id;
    if (id > 0) {
      plane.id = id;
      output = new PlaneOutput(plane);
    }
    return output;
  }

  @SoapOperation(PlaneOutput)
  async detail(data: IdInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane: Plane = await entityManager.findOne(Plane, data.id);
    const output = new PlaneOutput(plane);
    return output;
  }

  @SoapOperation(PlaneOutput)
  async update(data: PlaneInput): Promise<PlaneOutput> {
    const entityManager = getManager();
    const plane = await entityManager.findOne(Plane, data.id);
    let output = new PlaneOutput();
    if (plane) {
      await entityManager.update(Plane, plane.id, data.toPlane());
      output = new PlaneOutput(plane);
    }
    return output;
  }

  @SoapOperation(ResultOutput)
  async delete(data: IdInput): Promise<ResultOutput> {
    const entityManager = getManager();
    const { raw, affected } = await entityManager.delete(Plane, data.id);
    const output = new ResultOutput();
    output.result = affected === 1 ? 'success' : 'failed';
    return output;
  }
}
