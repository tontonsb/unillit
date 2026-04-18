create table quiz_runs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  script_id    text not null,
  dataset      text not null,
  total        int not null,
  correct      int not null default 0,
  completed    boolean not null default false,
  started_at   timestamptz default now(),
  completed_at timestamptz
);

alter table quiz_runs enable row level security;

create policy "users can insert their own runs"
  on quiz_runs for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can update their own runs"
  on quiz_runs for update
  to authenticated
  using (auth.uid() = user_id);

create policy "users can read their own runs"
  on quiz_runs for select
  to authenticated
  using (auth.uid() = user_id);

create table quiz_answers (
  id          uuid primary key default gen_random_uuid(),
  run_id      uuid references quiz_runs not null,
  user_id     uuid references auth.users not null,
  prompt      text not null,
  correct     boolean not null,
  answered_at timestamptz default now()
);

alter table quiz_answers enable row level security;

create policy "users can insert their own answers"
  on quiz_answers for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can read their own answers"
  on quiz_answers for select
  to authenticated
  using (auth.uid() = user_id);

create index on quiz_runs (user_id, script_id, dataset);
create index on quiz_answers (run_id);
create index on quiz_answers (user_id, prompt);

create view question_stats with (security_invoker = on) as
  select
    a.user_id,
    r.script_id,
    r.dataset,
    a.prompt,
    count(*)                                as total,
    count(*) filter (where a.correct)       as correct,
    max(a.answered_at)                      as last_answered_at
  from quiz_answers a
  join quiz_runs r on r.id = a.run_id
  group by a.user_id, r.script_id, r.dataset, a.prompt;

grant select on question_stats to authenticated;
