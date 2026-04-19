alter table quiz_runs
  add column quiz_type  text,
  add column font       text,
  add column info_sheet text,
  add column tolerance  int not null default 0;

alter table quiz_answers
  add column font       text,
  add column info_sheet text,
  add column tolerance  int not null default 0,
  add column errors     int not null default 0;

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
    count(*)                                as total,
    count(*) filter (where a.correct)       as correct,
    round(avg(a.errors)::numeric, 2)        as avg_errors,
    max(a.answered_at)                      as last_answered_at
  from quiz_answers a
  join quiz_runs r on r.id = a.run_id
  group by a.user_id, r.script_id, r.dataset, a.prompt,
           r.quiz_type, a.font, a.info_sheet, a.tolerance;

grant select on question_stats to authenticated;
