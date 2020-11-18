import React from 'react';
import qrcode, { QRCodeRenderersOptions, QRCodeToStringOptions } from 'qrcode';
import DOMPurify from 'isomorphic-dompurify';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import useDidMount from '../../utils/hooks/useDidMount';
import useDidUpdate from '../../utils/hooks/useDidUpdate';

export type QRCodeProps = QRCodeRenderersOptions & {
  className?: string;
  text: string;
};

const generateQR = async (text: string, options?: QRCodeToStringOptions) => {
  const defaultOptions: QRCodeToStringOptions = { type: 'svg' };
  const res = await qrcode.toString(text, { ...defaultOptions, ...options });
  return DOMPurify.sanitize(res);
};

const QRCode: React.FC<QRCodeProps> = props => {
  const [svg, setSVG] = React.useState<string>();
  const theme = useTheme<Theme>();
  const { className, color: _color, margin = 0, text, width: _width = 120, ...rest } = props;
  delete rest.children;

  const color: QRCodeProps['color'] = {
    dark: theme.color.darkPrimary,
    light: theme.color.lightPrimary,
    ..._color,
  };

  let width = _width;
  if (_width < 21) {
    width = 21;
  }

  useDidMount(() => {
    const generate = async () => {
      const generatedSVG = await generateQR(text, { ...rest, color, margin, width });
      setSVG(generatedSVG);
    };
    generate();
  });

  useDidUpdate(() => {
    const generate = async () => {
      const generatedSVG = await generateQR(text, { ...rest, color, margin, width });
      setSVG(generatedSVG);
    };
    generate();
  }, [props]);

  if (svg) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  return null;
};

export default QRCode;
