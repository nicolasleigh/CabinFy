import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className='border rounded-md flex flex-col col-span-2 '>
      <div>
        <h2 className='text-lg font-semibold p-2'>Today</h2>
      </div>
      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className='overflow-y-auto overflow-x-hidden flex flex-col gap-2'>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className='font-bold text-2xl text-muted-foreground text-center mt-4'>No activity today...</p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
