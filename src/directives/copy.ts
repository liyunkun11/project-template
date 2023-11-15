import type { DirectiveBinding } from "vue";
import { message } from "ant-design-vue";
import Clipboard from "clipboard";

interface CopyEl extends HTMLElement {
  copyStr: string;
  copyHandler: () => void;
}

export default {
  mounted(el: CopyEl, binding: DirectiveBinding) {
    el.copyStr = binding.value;
    el.copyHandler = () => {
      const triggerEl = document.createElement("button");
      const clipboard = new Clipboard(triggerEl, {
        text: () => el.copyStr,
        action: () => "copy",
        container: document.body,
      });
      clipboard.on("success", () => {
        message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        message.error("复制失败, 没有剪贴板权限");
        clipboard.destroy();
      });
      triggerEl.click();
    };
    el.addEventListener("click", el.copyHandler);
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyStr = binding.value;
  },
  unmounted(el: CopyEl) {
    el.removeEventListener("click", el.copyHandler);
  },
};
