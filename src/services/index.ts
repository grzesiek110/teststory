import { ExpressionsService} from './expressions.service';
import { VariablesService } from './variables.service';

export * from './expressions.service';
export * from './variables.service';

export const expressionsService = new ExpressionsService();
export const variablesService = new VariablesService();