import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div className='w-96 mx-auto border p-5 rounded-md'>
      <h1 className='text-xl font-semibold mb-4'>Update Hotel Settings</h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
