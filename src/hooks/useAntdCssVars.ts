import { theme } from "ant-design-vue";
import { watchEffect } from "vue";
import { CSS_KEY_PREFIX } from "@/stores/theme";
import { setCssVar } from "@/utils/cssvar";

export const useAntdCssVars = () => {
  const { token } = theme.useToken();
  watchEffect(() => {
    const t = token.value;
    setCssVar(`${CSS_KEY_PREFIX}-color-text-primary`, t.colorText);
    setCssVar(`${CSS_KEY_PREFIX}-color-text-regular`, t.colorTextLabel);
    setCssVar(`${CSS_KEY_PREFIX}-color-text-secondary`, t.colorTextSecondary);
    setCssVar(`${CSS_KEY_PREFIX}-color-text-placeholder`, t.colorTextPlaceholder);
    setCssVar(`${CSS_KEY_PREFIX}-color-text-disabled`, t.colorTextDisabled);
    setCssVar(`${CSS_KEY_PREFIX}-color-bg`, t.colorBgLayout);
    setCssVar(`${CSS_KEY_PREFIX}-color-bg-container`, t.colorBgContainer);
    setCssVar(`${CSS_KEY_PREFIX}-color-bg-mask`, t.colorBgMask);
    setCssVar(`${CSS_KEY_PREFIX}-color-bg-overlay`, t.colorBgElevated);
    setCssVar(`${CSS_KEY_PREFIX}-color-border`, t.colorBorder);
    setCssVar(`${CSS_KEY_PREFIX}-color-divider`, t.colorSplit);
    setCssVar(`${CSS_KEY_PREFIX}-radius`, t.borderRadius);
    setCssVar(`${CSS_KEY_PREFIX}-shadow`, t.boxShadow);
  });
};
