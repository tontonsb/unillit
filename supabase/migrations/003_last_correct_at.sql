drop view question_stats;

create view question_stats with (security_invoker = on) as
  select
    a.user_id,
    r.script_id,
    r.dataset,
    a.prompt,
    r.quiz_type,
    a.font,
    a.info_sheet,
    a.tolerance,
    a.errors,
    count(*)                                          as total,
    count(*) filter (where a.correct)                 as correct,
    max(a.answered_at) filter (where a.correct)       as last_correct_at,
    max(a.answered_at)                                as last_answered_at
  from quiz_answers a
  join quiz_runs r on r.id = a.run_id
  group by a.user_id, r.script_id, r.dataset, a.prompt,
           r.quiz_type, a.font, a.info_sheet, a.tolerance, a.errors;

grant select on question_stats to authenticated;
