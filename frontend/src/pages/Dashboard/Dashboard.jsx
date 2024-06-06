import React, {useMemo} from "react";
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { Box, Button } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from 'material-react-table';

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});
export const Dashboard = () => {

    let data = []

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    };


    const colums = useMemo(() => [
        {
            accessorKey: 'month',
            header: 'Mois',
            size: 125,
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'jde',
            header: 'JDE',
            size: 150,
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'matriculate',
            size: 175,
            header: 'Immat ou N° Série',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'model',
            size: 200,
            header: 'Modèle / Remorque',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'client',
            header: 'CLIENT',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'address',
            header: 'Adrèsse',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'localisation',
            header: 'Localisation',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'start',
            header: 'Début panne',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'appointement',
            header: 'Demande rdv',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'enter',
            header: 'Entrée Garage',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'works',
            header: 'Demande Travaux',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'leave',
            header: 'Sortie Garage',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'km_enter',
            header: 'Km/H Entrée Garage',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'km_exit',
            header: 'Km/H Sortie Garage',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'immo',
            header: 'Nb Jours Immo',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'order',
            header: 'N° OR (Ordre Reparation)',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'diagnostics',
            size: 300,
            header: 'Diagnostics / Travaux Effectuer Aux Atelier & Commentaire SAV',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '250px',
            }
        },
        {
            accessorKey: 'no_sav',
            header: 'N° DA',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'prevision',
            header: 'Date Prev. Sortie Garage',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'achats',
            header: 'Commentaire Achat Local',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '250px',
            }
        },
        {
            accessorKey: 'no_achat',
            header: 'N° BC',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'imports',
            header: 'Commentaire Import',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '250px',
            }
        },
        {
            accessorKey: 'no_import',
            header: 'N° BC',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'immo_reel',
            header: 'Nb Jours Immo Réelle',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'status',
            header: 'Actif / Non Actif',
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
            }
        },
        {
            accessorKey: 'decision',
            header: 'DECISION',
            size: 150,
            headerStyle: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '250px',
            }
        },
    ], []);

    const table = useMaterialReactTable({
        columns: colums,
        data: [],
        defaultDisplayColumn: { enableResizing: true },
        enableBottomToolbar: false,
        enableColumnResizing: true,
        enableColumnVirtualization: true,
        enableGlobalFilterModes: true,
        enablePagination: false,
        enableColumnPinning: true,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        initialState: {
            columnPinning: { left: ['month', 'jde', 'matriculate', 'model'], right: ['decision'] },
        },
        muiTableContainerProps: {
            sx: {
                minHeight: '72.6vh'
            }
        },
        renderTopToolbarCustomActions: ({ table }) => (

      <Box

        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >

        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
            Excel
        </Button>
       <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
            Pdf
        </Button>
      </Box>
    ),

    });

    return (
        <MaterialReactTable table={table} />
    );
}
