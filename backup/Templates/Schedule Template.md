<%*
const schedule_date = await tp.user.week_day(tp).find_date_for_new_daily_schedule_page()
const current_week_day = await tp.user.week_day(tp, schedule_date)
await tp.file.move(current_week_day.get_title_for_page_in_schedule_notes())
const date_tag = schedule_date.format('YYYY-MM-DD')
-%>
---
cssclasses: 
tags:
  - schedule
day: <%* tR += date_tag %>
---
^properties
- <span class="green">6:30 AM</span>
	- [ ] Morning Routine in Keep
	- [ ] Adjust day plan
- <span class="green">7:30 AM</span>
<%* if (current_week_day.is_weekday()) { -%>
<%* if (current_week_day.is_not("Mo")) { -%>
	- [ ] Log on Emp and CW
<%* } else { -%>
	- [ ] Log on Emp
<%* } -%>
	- [ ] Start work tasks
<%* } -%>
- <span class="green">7:45 AM</span>
- <span class="green">8:00 AM</span>
- <span class="green">8:15 AM</span>
	- [ ] Go outside for at least 5 minutes... every day!!! Take Hannibal outside if he wants to come
- <span class="green">8:30 AM</span>
<%* if (current_week_day.is("Sa")) { -%>
	- [ ] Leave for Climbing
- <span class="green">9:30 AM</span>
	- [ ] Leave for home or Therapy
<%* } else { -%>
- <span class="green">8:45 AM</span>
- <span class="green">9:00 AM</span>
- <span class="green">9:15 AM</span>
- <span class="green">9:30 AM</span>
<%* } -%>
<%* if (current_week_day.is_not("Mo")) { -%>
	- [ ] Standup
<%* } else { -%>
- <span class="green">9:45 AM</span>
<%* } -%>
- <span class="green">10:00 AM</span>
- <span class="green">10:15 AM</span>
- <span class="green">10:30 AM</span>
- <span class="green">10:45 AM</span>
- <span class="green">11:00 AM</span>
- <span class="green">11:15 AM</span>
- <span class="green">11:30 AM</span>
- <span class="green">11:45 AM</span>
- <span class="green">12:00 PM</span>
	- [ ] Make Smoothie - vape if true.
	- [ ] Olive oil
<%* if (current_week_day.is("We")) { -%>
	- [ ] Take out trash/recycling
<%* } -%>
	- [ ] Peloton 20 minutes - vape if true
- <span class="green">12:15 PM</span>
- <span class="green">12:30 PM</span>
- <span class="green">12:45 PM</span>
- <span class="green">1:00 PM</span>
- <span class="green">1:15 PM</span>
- <span class="green">1:30 PM</span>
- <span class="green">1:45 PM</span>
- <span class="green">2:00 PM</span>
- <span class="green">2:15 PM</span>
- <span class="green">2:30 PM</span>
- <span class="green">2:45 PM</span>
- <span class="green">3:00 PM</span>
- <span class="green">3:15 PM</span>
- <span class="green">3:30 PM</span>
- <span class="green">3:45 PM</span>
- <span class="green">4:00 PM</span>
	- [ ] Ice bath - vape if true.
- <span class="green">4:15 PM</span>
- <span class="green">4:30 PM</span>
- <span class="green">4:45 PM</span>
- <span class="green">5:00 PM</span>
- <span class="green">5:15 PM</span>
- <span class="green">5:30 PM</span>
- <span class="green">5:45 PM</span>
- <span class="green">6:00 PM</span>
	- [ ] Olive oil with dinner
- <span class="green">6:15 PM</span>
- <span class="green">6:30 PM</span>
- <span class="green">6:45 PM</span>
- <span class="green">7:00 PM</span>
- <span class="green">7:15 PM</span>
- <span class="green">7:30 PM</span>
- <span class="green">7:45 PM</span>
- <span class="green">8:00 PM</span>
- <span class="green">8:15 PM</span>
- <span class="green">8:30 PM</span>
- <span class="green">8:45 PM</span>
- <span class="green">9:00 PM</span>
- <span class="green">9:15 PM</span>
- <span class="green">9:30 PM</span>
- <span class="green">9:45 PM</span>
- <span class="green">10:00 PM</span>
	- [ ] Flip or roll if GOOD BOI
	- [[Reward Tracker and Rules]]
	- [[Reward Lottery Qualification]]
	- [ ] Goals Check
	- [ ] Weekly Goals Check
	- [ ] Tomorrow Daily Goals Set
	- [ ] Plan tomorrow
	- [ ] Bedtime Pill
	- [ ] Wash Face and put on cream
	- [ ] Plan tomorrow
	- [ ] Prep Clothes Tomorrow
- <span class="green">10:45 PM</span>
	- [ ] Get in bed if not