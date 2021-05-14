import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../shared/feedback';

@Injectable({providedIn: 'root'})
export class FeedbackService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public createFeedback(feedback: Feedback, email: string, receiverId: number): Observable<Feedback> {
        let data = {feedback, email, receiverId}
        data.feedback = feedback;
        data.email = email;
        data.receiverId = receiverId;
        return this.http.post<Feedback>(`${this.apiServerUrl}/feedback/create`, data);
    }

    public getFeedbacksCount(userId: number): Observable<number> {
        return this.http.get<number>( `${this.apiServerUrl}/feedback/get/feedbacks/count/${userId}`)
    }

    public getUserFeedbacks(userId: number): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(`${this.apiServerUrl}/feedback/get/user/feedbacks/${userId}`);
    }
}
