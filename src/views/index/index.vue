<template>
  <div class="index_wrap">
    首页
  </div>
</template>

<script>
import { checkAuditTime, parseTime } from "@/utils/time.js";

export default {
  name: 'IndexView',
  components: {
  },
  create () {
    let stime = new Date(); //开始日期
    stime = parseTime(stime, '{y}-{m}-{d}');
    checkAuditTime(stime);
  }
};
</script>
