console.log("Hello via Bun!");
import fs from "node:fs";
import PdfPrinter from "pdfmake";
// pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
const TABLE_ROW_HEIGHT = 20;
const func = () => {
	const docDefinition = {
		content: [
			{
				text: `発行日:${new Date().toLocaleDateString()}`,
				alignment: "right",
				margin: [0, 0, 0, 40],
			},
			// タイトルヘッダー
			{ text: "お支払通知書", style: "header", alignment: "center" },
			// 送付先氏名
			{ style: "text", text: "小唄周平 様" },
			// 弊社記述欄
			// Object.values(CYBER_BUZZ_ABOUT).map((text) => ({
			// 	style: "text",
			// 	text,
			// 	alignment: "right",
			// })),
			//　支払合計金額
			{
				style: "table",
				table: {
					heights: TABLE_ROW_HEIGHT,
					widths: [100, 100],
					body: [[`￥${1000}`]],
				},
				alignment: "center",
				// layout: tableLineLayout,
			},
			//　売上明細
			{
				columns: [
					{
						style: "table",
						table: {
							heights: TABLE_ROW_HEIGHT,
							widths: [80, "auto", "auto", 80],
							body: [
								111111,
								// ["日付", "案件名", "案件ID", "支払金額(税抜)"].map((text) =>
								// 	generateTableRowDesign(text),
								// ),
								// ...event.creatorSales.map(
								// 	({ salesFixedDate, jobTitle, jobId, withoutTaxSales }) =>
								// 		[
								// 			salesFixedDate,
								// 			jobTitle,
								// 			jobId,
								// 			`￥${withoutTaxSales.toLocaleString()}`,
								// 		].map((text) => generateTableRowDesign(text)),
								// ),
							],
						},
						// layout: tableLineLayout,
					},
				],
			},
			//　売上明細合計
			{
				style: "table",
				columns: [
					{ width: "*", text: "" },
					{
						width: "auto",
						table: {
							heights: TABLE_ROW_HEIGHT,
							widths: [100, 100],
							body: [
								[
									// generateTableRowDesign("報酬額計 (税抜)"),
									// generateTableRowDesign(
									// 	`￥${event.creatorDeposit.withoutTaxSalesAmount.toLocaleString()}`,
									// ),
								],
								[
									// generateTableRowDesign("消費税額 (10%)"),
									// generateTableRowDesign(
									// 	`￥${event.creatorDeposit.consumptionTaxAmount.toLocaleString()}`,
									// ),
								],
							],
						},
						// layout: paymentTotalTableRow,
					},
				],
			},
			{
				text: " 上記のお支払額合計を貴殿指定口座へお振込みいたします。",
				margin: [0, 60, 0, 0],
			},
			// 振込先口座情報
			{
				style: "table",
				table: {
					widths: ["*"],
					heights: TABLE_ROW_HEIGHT,
					body: [[11111], [22222]],
				},
				alignment: "right",
				layout: {
					// vLineWidth: (i, node) =>
					// 	i === 0 || (node.table.widths && i === node.table.widths.length)
					// 		? 0
					// 		: 1,
				},
			},
			{ text: "※送付後、1週間以内に誤りのある旨の連絡がない場合には" },
			{ text: "記載内容のとおり確認があったものとさせていただきます。" },
		],
		styles: {
			text: {
				margin: [0, 3, 0, 3],
			},
			header: {
				fontSize: 25,
				bold: true,
				margin: [0, 0, 0, 40],
			},
			table: {
				margin: [0, 5, 0, 15],
			},

			defaultStyle: {
				font: "Ipag",
			},
		},
	};
	const pdfPrinter = new PdfPrinter({
		Roboto: {
			normal: "fonts/ipag.ttf",
			bold: "fonts/ipag.ttf",
			italics: "fonts/ipag.ttf",
			bolditalics: "fonts/ipag.ttf",
		},
	});
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const pdf = pdfPrinter.createPdfKitDocument(docDefinition as any);
	pdf.pipe(fs.createWriteStream("example.pdf"));
	pdf.end();
};
func();
