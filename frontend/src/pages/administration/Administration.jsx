import 'react-tabulator/lib/css/tabulator_simple.min.css';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import axiosClient from "../../axios-client.jsx";
import { API_GET_ALL_USER } from "../../../config.js";
import { toast } from "react-hot-toast";
import { Alert } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const validateRequired = (value) => !!value.length;

const validateEmail = (email) => !!email.length && email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

function validateUser(user) {
    return {
        username: !validateRequired(user.username) ? "Identifiant Requise" : '',
        first_name: !validateRequired(user.username) ? "Nom Requise" : '',
        email: !validateEmail(user.email) ? "Email Incorrect" : ''
    }

}


export function Administration() {
    const [validationErrors, setValidationErrors] = useState({});

    const { isLoading, error, data = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => axiosClient.get(API_GET_ALL_USER).then(({ data }) => {
            return data.users || [];
        }).catch((err) => {
            toast.error("Erreur de récupération de la base !");
            return [];
        })
    });

    if (error) {
        toast.error(error.message);
        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Alert variant="danger" className="d-flex align-items-center">
                            <FaExclamationTriangle className="me-2" />
                            Erreur de récupération de la base !
                        </Alert>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'ID',
            header: 'id',
            enableEditing: false,
            size: 150,

        },
        {
            accessorKey: 'username',
            header: 'Session',
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.username,
                helperText: validationErrors?.username,
                onFocus: () => setValidationErrors({
                    ...validationErrors,
                    username: undefined
                }),
            }
        },
        {
            accessorKey: 'first_name',
            header: 'Nom',
            muiEditTextFieldProps: {
                required: true,
                error: !!validationErrors?.first_name,
                helperText: validationErrors?.first_name,
                onFocus: () => setValidationErrors({
                    ...validationErrors,
                    first_name: undefined
                }),
            }
        },
        {
            accessorKey: 'last_name',
            header: 'Prénom',
        },
        {
            accessorKey: 'email',
            header: 'Email',
            muiEditTextFieldProps: {
                type: 'email',
                required: true,
                error: !!validationErrors?.email,
                helperText: validationErrors?.email,
                onFocus: () => setValidationErrors({
                    ...validationErrors,
                    email: undefined
                }),
            }
        },
        {
            accessorKey: 'is_active',
            header: 'Actif',
            size: 150
        },
        {
            accessorKey: 'authorizer',
            header: 'Autorisé',
            size: 150
        },
        {
            accessorKey: 'is_staff',
            header: 'Staff',
            size: 150
        },
        {
            accessorKey: 'is_superuser',
            header: 'Administateur',
            size: 150
        }
    ], [validationErrors]);

    //CREATE Hook
    const {
        mutateAsync: createUser,
        isPending: isCreatingUser
    } = useCreateUser()

    // READ Hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers
    } = useGetUsers(data)

    const {
        mutateAsync: updateUser,
        isPending: isUpdatingUser
    } = useUpdateUser()

    const {
        mutateAsync: deleteUser,
        isPending: isDeletingUser
    } = useDeleteUser()

    const handleCreateUser = async ({values, table}) => {
        const newValidationErrors = validateUser(values);

        if (Object.values(newValidationErrors).some((error) => error)){
            setValidationErrors(newValidationErrors)
            return ;
        }
        setValidationErrors({})
        await createUser(values)
        table.setCreatingRow(null)
    }

    const handleSaveUser = async ({values, table}) => {
        const newValidationErrors = validateUser(values);

        if (Object.values(newValidationErrors).some((error) => error)){
            setValidationErrors(newValidationErrors)
            return ;
        }
        setValidationErrors({})
        await updateUser(values)
        table.setEditingRow(null)
    }

    const openDeleteConfirmModal = (row) => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              deleteUser(row.original.id);
            }
          };

    let table = useMaterialReactTable({
        columns: columns,
        data: fetchedUsers,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError ? {
            color: 'error',
            children: 'Erreur de chargement des données'
        } : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px'
            }
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderCreateRowDialogContent: ({table, row, internalEditComponents}) => (
            <>
                <DialogTitle variant="h5">Créer un Nouvau Utilisateur</DialogTitle>
                <DialogContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  {internalEditComponents}
                </DialogContent>
                <DialogActions>
                  <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
              </>
        ),
        renderEditRowDialogContent:({table, row, internalEditComponents}) => (
            <>
                <DialogTitle variant="h5">Modifier L'utilisateur</DialogTitle>
                <DialogContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  {internalEditComponents}
                </DialogContent>
                <DialogActions>
                  <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
              </>
        ),
        renderRowActions: ({row, table}) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
        )
        ,
        renderTopToolbarCustomActions: ({table}) => (
            <Button variant="container" onClick={()=> {
                table.setCreatingRow(true)
            }}>Ajouter</Button>
        )
        ,
        state: {
            isLoading: isLoadingUsers,
            isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers
        }
    });

    return (<MaterialReactTable table={table} />);
}


// CREATE Hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return Promise.resolve()
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => [
                ...prevUsers,
                {
                    ...newUserInfo,
                    id: (Math.random() + 1).toString(36).substring(7),
                }
            ])
        }
    })
}

// READ Hook (get users from api)
function useGetUsers(data) {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return Promise.resolve(data)
        }
    })
}

// UPDATE Hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return Promise.resolve()
        },
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => {
                prevUsers?.map((prevUsers) => prevUsers.id === newUserInfo.id ? newUserInfo : prevUsers)
            })
        }
    })
}

// DELETE Kook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (userId) => {
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        onMutate: (userId) => {
            queryClient.setQueryData(['users'], (prevUsers) => prevUsers?.filter((user) => user.id !== userId),)
        }
    })
}