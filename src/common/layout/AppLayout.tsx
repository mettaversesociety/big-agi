import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Box, Container } from '@mui/joy';

import { ModelsModal } from '~/common/views/models-modal/ModelsModal';
import { SettingsModal } from '~/common/views/settings-modal/SettingsModal';

import { isPwa } from '~/common/util/pwaUtils';
import { useUIPreferencesStore } from '~/common/state/store-ui';

import { AppBar } from './AppBar';
import { NoSSR } from '../components/NoSSR';


export function AppLayout(props: {
  noAppBar?: boolean, suspendAutoModelsSetup?: boolean,
  children: React.ReactNode,
}) {
  // external state
  const { centerMode } = useUIPreferencesStore(state => ({ centerMode: isPwa() ? 'full' : state.centerMode }), shallow);

  return (
    // Global NoSSR wrapper: the overall Container could have hydration issues when using localStorage and non-default maxWidth
    <NoSSR>

      <Container
        disableGutters
        maxWidth={centerMode === 'full' ? false : centerMode === 'narrow' ? 'md' : 'xl'}
        sx={{
          boxShadow: {
            xs: 'none',
            md: centerMode === 'narrow' ? 'md' : 'none',
            xl: centerMode !== 'full' ? 'lg' : 'none',
          },
        }}>

        <Box sx={{
          display: 'flex', flexDirection: 'column',
          height: '100dvh',
        }}>

          {!props.noAppBar && <AppBar sx={{
            zIndex: 20, // position: 'sticky', top: 0,
          }} />}

          {props.children}

        </Box>

      </Container>

      {/* Overlay Settings */}
      <SettingsModal />

      {/* Overlay Models (& Model Options )*/}
      <ModelsModal suspendAutoModelsSetup={props.suspendAutoModelsSetup} />

    </NoSSR>
  );
}