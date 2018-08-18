import { container } from '@src/container';
import { IContext, IContextProvider, Type as ContextProviderType } from '@src/graphql/context';

const provider = container.get<IContextProvider>(ContextProviderType);

const context: IContext = Object.assign({}, provider, { headers: {} });

export default context;
