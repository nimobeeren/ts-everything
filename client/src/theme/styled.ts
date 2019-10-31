import styled, { CreateStyled } from '@emotion/styled';
import { theme } from './theme';

/**
 * Re-export of the style utility that has the correct type with respect to our theme.
 * This allows for code completion on the theme object.
 */
export default styled as CreateStyled<typeof theme>;
