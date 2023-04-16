import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Course", httpClient, httpUrlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.http.get("/api/courses").pipe(map((res) => res["payload"]));
  }
}
