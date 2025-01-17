import type { UserGroupAssignee } from 'src/__generated__/graphql';

import { useMemo } from 'react';
import { useMutation } from '@apollo/client';

import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { gql } from 'src/__generated__/gql';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

const ASSIGN_USER = gql(/* GraphQL */ `
  mutation AssignUser($data: AssignUserInput!) {
    assignUser(data: $data) {
      success
    }
  }
`);

// ----------------------------------------------------------------------
type Props = {
  user: Partial<UserGroupAssignee>;
  userGroupId: string;
};

export default function UserItem({ userGroupId, user }: Props) {
  const [assignUser, { data, loading }] = useMutation(ASSIGN_USER);
  const isAssigned = useMemo(
    () => data?.assignUser.success ?? user.userGroupId === userGroupId,
    [user, userGroupId, data]
  );
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <LoadingButton
          onClick={() => {
            assignUser({ variables: { data: { userGroupId, userId: user.id! } } });
          }}
          loading={loading}
          size="small"
          color={isAssigned ? 'primary' : 'inherit'}
          startIcon={
            <Iconify
              width={16}
              icon={isAssigned ? 'eva:checkmark-fill' : 'mingcute:add-line'}
              sx={{ mr: -0.5 }}
            />
          }
        >
          {isAssigned ? 'Assigned' : 'Assign'}
        </LoadingButton>
      }
      sx={{ height: 64 }}
    >
      <ListItemAvatar>
        <Avatar src={user.avatar?.url ?? undefined} />
      </ListItemAvatar>

      <ListItemText
        primaryTypographyProps={{
          typography: 'subtitle2',
          sx: { mb: 0.25 },
        }}
        secondaryTypographyProps={{ typography: 'caption' }}
        primary={
          <>
            {user.name}
            {user.userGroupId && user.userGroupId !== userGroupId && (
              <Typography variant="caption"> ({user.userGroupName})</Typography>
            )}
          </>
        }
        secondary={user.email}
      />
    </ListItem>
  );
}
