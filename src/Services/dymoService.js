// ----------------------------- Barcode Label xml --------------------------

const labelXml =
  '<?xml version="1.0" encoding="utf-8"?>\
    <DieCutLabel Version="8.0" Units="twips">\
      <PaperOrientation>Portrait</PaperOrientation>\
      <Id>Small30347</Id>\
      <PaperName>30347 1 in x 1-1/2 in</PaperName>\
      <DrawCommands>\
        <RoundRectangle X="0" Y="0" Width="2000" Height="5040" Rx="270" Ry="270" />\
      </DrawCommands>\
      <ObjectInfo>\
        <BarcodeObject>\
          <Name>Barcode</Name>\
          <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
          <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
          <LinkedObjectName></LinkedObjectName>\
          <Rotation>Rotation0</Rotation>\
          <IsMirrored>False</IsMirrored>\
          <IsVariable>False</IsVariable>\
          <Text></Text>\
          <Type>QRCode</Type>\
          <Size>Large</Size>\
          <TextPosition>None</TextPosition>\
          <TextFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
          <CheckSumFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
          <TextEmbedding>None</TextEmbedding>\
          <ECLevel>0</ECLevel>\
          <VerticalAlignment>Center</VerticalAlignment>\
          <HorizontalAlignment>Center</HorizontalAlignment>\
          <QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />\
        </BarcodeObject>\
        <Bounds X="0" Y="0" Width="2880" Height="1435" />\
      </ObjectInfo>\
      <ObjectInfo>\
        <TextObject>\
          <Name>Text</Name>\
          <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
          <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
          <LinkedObjectName></LinkedObjectName>\
          <Rotation>Rotation0</Rotation>\
          <IsMirrored>False</IsMirrored>\
          <IsVariable>False</IsVariable>\
          <HorizontalAlignment>Center</HorizontalAlignment>\
          <VerticalAlignment>Bottom</VerticalAlignment>\
          <TextFitMode>AlwaysFit</TextFitMode>\
          <UseFullFontHeight>False</UseFullFontHeight>\
          <Verticalized>False</Verticalized>\
          <StyledText>\
            <Element>\
              <String></String>\
                <Attributes>\
                  <Font Family="Arial" Size="5" Bold="False" Italic="False"\
                    Underline="False" Strikeout="False" />\
                  <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
                </Attributes>\
            </Element>\
          </StyledText>\
        </TextObject>\
        <Bounds X="0" Y="0" Width="2900" Height="1400" />\
      </ObjectInfo>\
    </DieCutLabel>';

export const loadPrinters = async () => {
  const printers = await window.dymo.label.framework.getPrintersAsync();
  return printers;
};

export const generateLabelImage = async (vials, start, end) => {
  try {
    if (start > end) {
      throw new Error("Start index is greater than Ending index");
    }

    const qrLabel = window.dymo.label.framework.openLabelXml(labelXml);
    const labelResults = [];
    for (let i = start; i <= end; i++) {
      qrLabel.setObjectText("Text", vials[i]);
      qrLabel.setObjectText("Barcode", vials[i]);
      const pngData = await window.dymo.label.framework.renderLabelAsync(
        qrLabel,
        "",
        ""
      );
      const lab = { id: vials[i], png: "data:image/png;base64," + pngData };
      labelResults.push(lab);
    }
    return labelResults;
  } catch (error) {
    throw new Error(error);
  }
};

export const printSingleLabel = async (labelText, printerName) => {
  try {
    const qrLabel = window.dymo.label.framework.openLabelXml(labelXml);
    qrLabel.setObjectText("Barcode", labelText);
    if (printerName === "") {
      throw new Error("No printer selected! Please select a valid printer");
    }
    await window.dymo.label.framework.printLabelAsync(
      printerName,
      "",
      qrLabel,
      ""
    );
  } catch (error) {
    throw new Error(
      `Unable to print label with the text ${labelText}. ERROR: ${error}`
    );
  }
};

export const printAllLabels = async (labelTextArray, printerName) => {
  try {
    if (printerName === "") {
      throw new Error("No printer selected! Please select a valid printer");
    }
    const qrLabel = window.dymo.label.framework.openLabelXml(labelXml);
    const labelSetBuilder = new window.dymo.label.framework.LabelSetBuilder();
    labelTextArray.forEach((lab) => {
      const record = labelSetBuilder.addRecord();
      record.setText("Barcode", lab);
    });
    await window.dymo.label.framework.printLabelAsync(
      printerName,
      "",
      qrLabel,
      labelSetBuilder
    );
  } catch (error) {
    throw new Error(`Unable to print set of labels. ERROR: ${error}`);
  }
};
