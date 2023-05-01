import axios from "axios";
import Reminder from "../interfaces/reminder";

class ReminderService {
    http = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/'
    })

    /** Now add some methods to get, add reminders */

    async getReminders(){
        /** The http get method is generic so we can specify the type of object we get from the api */
        const response = await this.http.get<Reminder[]>('/todos');

        return response.data;
    }

    async addReminder(title: string){
        const response = await this.http.post<Reminder>('/todos', { title })

        return response.data;
    }

    async removeReminder(id: number){
        const response = await this.http.delete('/todos/' + id)
    }
}

/** Instead of exporting the class, we are exporting an instance of this class
 *  The consumer of this module won't have to new up this class everytime they use
 */
export default new ReminderService();