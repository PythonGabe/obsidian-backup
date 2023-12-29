<%*
const week_day_client = tp.user.week_day(tp)
await tp.file.move(week_day_client.get_rewards_log_title_page())
const date_tag = week_day_client.get_day().format('YYYY-MM-DD')
-%>
---
cssclasses:
tags:
  - rewards-log
day: <%* tR += date_tag %>
flip_result: H | T
roll_result: 0-20
choice: Toy | Bank | Experience
item: (When Toy or Experience)
link: (When Relevant for Toy or Experience)

---

