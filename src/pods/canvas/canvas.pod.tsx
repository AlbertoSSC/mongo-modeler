import React from 'react';
import {
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { GUID, Size } from '@/core/model';
import { mockSchema } from './canvas.mock.data';
import classes from './canvas.pod.module.css';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EditTablePod } from '../edit-table';
import { EDIT_TABLE_TITLE } from '@/common/components/modal-dialog';
import { CanvasSvgComponent } from './canvas-svg.component';

export const CanvasPod: React.FC = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const {
    canvasSchema,
    loadSchema,
    updateTablePosition,
    updateFullTable,
    doFieldToggleCollapse,
  } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;
  // TODO: This is temporary code, once we get load and save
  // we won't need to load this mock data
  React.useEffect(() => {
    loadSchema(mockSchema);
  }, []);

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const handleToggleCollapse = (tableId: GUID, fieldId: GUID) => {
    doFieldToggleCollapse(tableId, fieldId);
  };

  const handleTableEditUpdate = (table: TableVm) => {
    updateFullTable(table);
    closeModal();
  };

  const handleEditTable = (tableInfo: TableVm) => {
    openModal(
      <EditTablePod
        table={tableInfo}
        relations={canvasSchema.relations}
        onSave={handleTableEditUpdate}
      />,
      EDIT_TABLE_TITLE
    );
  };

  const handleEditRelation = (relationId: GUID) => {
    console.log('TODO: handleEditRelation', relationId);
  };

  return (
    <div>
      <div className={classes.container}>
        <CanvasSvgComponent
          viewBoxSize={viewBoxSize}
          canvasSize={canvasSize}
          canvasSchema={canvasSchema}
          onUpdateTablePosition={updateTablePosition}
          onToggleCollapse={handleToggleCollapse}
          onEditTable={handleEditTable}
          onEditRelation={handleEditRelation}
        />
      </div>
    </div>
  );
};
