import type { DirectiveBinding } from "vue";
import { useClipboard } from "@vueuse/core";
import { message } from "ant-design-vue";

interface CopyEl extends HTMLElement {
  copyStr: string
  copyHandler: () => void
}

export default {
  mounted(el: CopyEl, binding: DirectiveBinding) {
    el.copyStr = binding.value;
    el.copyHandler = () => {
      const navigator = window.navigator;
      const { copy } = useClipboard({ navigator, legacy: true });
      copy(el.copyStr)
        .then(() => {
          message.success("已复制到剪贴板");
        })
        .catch((error) => {
          message.error("复制失败");
          console.log("复制失败原因：", error);
        });
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
