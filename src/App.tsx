import React, { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './interfaces/reminder';
import reminderService from './services/reminder';
import NewReminder from './components/NewReminder';

function App() {
  /** In react with typescript, the useState function is generic so you can pass the type to this function */
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, [])

  const loadReminders = async() => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  }

  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
    
  }

  const addReminder = async(title: string) => {
    const newReminder = await reminderService.addReminder(title)
    /** set the array to the new reminer including all existing reminders */
    setReminders([ newReminder, ...reminders ])
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <ReminderList items={reminders} onRemoveReminder={removeReminder}/>
    </div>
  );
}

export default App;
