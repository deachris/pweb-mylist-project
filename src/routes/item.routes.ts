import { Router } from 'express';
import * as controller from '../controllers/item.controller';
import { validateItem } from '../middlewares/validateItem';

const router = Router();

router.get('/', controller.getAllItems);
router.post('/', validateItem, controller.createItem);
router.put('/:id', validateItem, controller.updateItem);
router.delete('/:id', controller.deleteItem);

export default router;
