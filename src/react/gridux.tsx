import React, { useMemo, useState } from "react";

import "react-data-grid/lib/styles.css";

import DataGrid, { Column, RenderEditCellProps, RenderRowProps, Row } from "react-data-grid";

function autoFocusAndSelect(input: HTMLInputElement | null) {
	input?.focus();
	input?.select();
}

const customTextEditorClassname = `w-full px-2 bg-zinc-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]`;

function customTextEditor<TRow, TSummaryRow>(props: RenderEditCellProps<TRow, TSummaryRow>) {
	return (
		<input
			className={customTextEditorClassname}
			ref={autoFocusAndSelect}
			value={props.row[props.column.key as keyof TRow] as unknown as string}
			onChange={(event) =>
				props.onRowChange({ ...props.row, [props.column.key]: event.target.value })
			}
			onBlur={() => props.onClose(true, false)}
		/>
	);
}

const indexAxesClassname = `text-center text-md font-light text-slate-700 bg-stone-200 border-0 shadow-none`;

function createEditableColumn(key: string): Column<Row> {
	return {
		key,
		name: key,
		editable: true,
		cellClass: "border",
		width: 80,
		headerCellClass: indexAxesClassname,
		renderEditCell: customTextEditor,
		editorOptions: {
			commitOnOutsideClick: true,
			displayCellContent: false, // while editing
		},
	};
}

function createIndexColumn(): Column<Row> {
	return {
		key: "0",
		name: "",
		editable: false,
		frozen: true,
		cellClass: indexAxesClassname,
		headerCellClass: indexAxesClassname.replace(
			"bg-stone-200",
			"bg-stone-400/50 backdrop-blur-md",
		),
	};
}

type Row = Array<String>;
const initialRows: readonly Row[] = [...Array(1000).keys()].map((i) =>
	[...Array(1000).keys()].map((k) => (k === 0 ? (i + 1).toString() : "")),
);

function rowKeyGetter(row: Row) {
	return row.toString();
}

function rowRenderer(key: React.Key, props: RenderRowProps<Row>) {
	return <Row {...props} rowClass={() => "hover:bg-transparent"} />;
}

export function EmptyDataGridCreator() {
	const columns = useMemo((): readonly Column<Row>[] => {
		const columns: Column<Row>[] = [];
		columns.push(createIndexColumn());
		for (let i = 1; i <= 1000; i++) {
			const key = String(i);
			columns.push(createEditableColumn(key));
		}

		return columns;
	}, []);

	const [rows, setRows] = useState(() => initialRows);

	return (
		<DataGrid
			className="h-full rdg-light"
			columns={columns}
			rows={rows}
			onRowsChange={setRows}
			rowKeyGetter={rowKeyGetter}
			renderers={{ renderRow: rowRenderer }}
			defaultColumnOptions={{
				resizable: true,
			}}
		/>
	);
}
