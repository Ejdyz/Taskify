import SubTaskCheckbox from './SubTaskCheckbox';

export default function TaskView({tasks, handleMarkTask}) {
  return (
    <div className='flex flex-col gap-2 lg:w-1/3 md:w-2/3 w-full lg:max-w-1/3 md:max-w-2/3 max-w-full px-4'>
      {tasks.map((task) => (
          <div className="flex gap-2 w-full" key={task.id}>
            <SubTaskCheckbox task={task} handleMarkTask={handleMarkTask} />
          </div>
        ))}
    </div>
  )
}
