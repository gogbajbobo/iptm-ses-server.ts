import { controller } from '../../controller'
import entity from '../../entity'
import routes, { path } from './'

export default routes(`/${ path(__filename) }`, controller(entity.Category))
