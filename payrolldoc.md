worktimeMinutes
absencesMinutes
overtimeMinutes
fulltimeMinutes

WEEKSHEET_RECORD
inp: fulltime hours
inp: realtime hours
out: worktime factor 0..1
out: worktime hours array for week Mon-Sun

TIMESHEET_RECORD
inp: Period
inp: WEEKSHEET_RECORD: worktime factor, worktime hours array
out: working days for period
out: working hours for period + working hours array

WORKSHEET_RECORD
inp: TIMESHEET_RECORD
inp: absences hours
out: worked hours in base salary
out: worked hours in overtime salary
out: absences hours non paid

SALARY_RECORD
inp: salary amount for fulltime hours
inp: TIMESHEET_RECORD
inp: WORKSHEET_RECORD
out: salary amount for realtime hours
out: salary hours
out: salary factor
out: salary amount for worked hours

OVERTIME_RECORD
inp: salary amount for realtime hours
inp: hourly salary for overtime premium
inp: percentage factor for overtime premium
out: overtime hours
out: overtime factor
out: salary for overtime hours

package legalist
package payrolls
package lagalist.health
package payrolls.concept


