//
// Application Routes
//
// We will centralize them here, for UI and routing purposes.
//

import Router from 'next/router';

const APP_INDEX = '/';
const APP_CHAT = '/chat';
const APP_LABS = '/labs';
const APP_LINK_CHAT = '/link/chat/:linkId';
const APP_NEWS = '/news';

export const getIndexLink = () => APP_INDEX;

export const getChatLinkRelativePath = (chatLinkId: string) => APP_LINK_CHAT.replace(':linkId', chatLinkId);

const navigateFn = (path: string) => (replace?: boolean): Promise<boolean> =>
  Router[replace ? 'replace' : 'push'](path);

export const navigateToIndex = navigateFn(APP_INDEX);
export const navigateToChat = async () => await Router.push(APP_CHAT);
export const navigateToLabs = async () => await Router.push(APP_LABS);
export const navigateToNews = navigateFn(APP_NEWS);

export const navigateBack = Router.back;

export interface AppCallQueryParams {
  conversationId: string;
  personaId: string;
}

export function launchAppCall(conversationId: string, personaId: string) {
  void Router.push(
    {
      pathname: `/call`,
      query: {
        conversationId,
        personaId,
      } satisfies AppCallQueryParams,
    },
    // '/call',
  ).then();
}