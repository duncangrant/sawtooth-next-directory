/*=========================================================================
Copyright © 2017 T-Mobile USA, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
=========================================================================*/
import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";
import {toPromise} from "rxjs/operator/toPromise";
import {UtilsService} from "../utils.service";
import {environment} from "../../../environments/environment";
import {ContextService} from "../context.service";

@Injectable()
export class GroupService {
    constructor(private http: Http,
                private context: ContextService,
                private utils: UtilsService) {
    }

    getGroups() {
        return this.http.get(environment.roles, {
            headers: this.context.httpHeaders()
        })
            .toPromise()
            .then((response) => {
            console.log('Groups: ', response.json().data);
                return response.json().data;
            }).catch(this.utils.catchError)
    }

    addMemberToGroup(groupId, member) {
        let request = environment.add_member(groupId, member);
        return this.http.post(request.url, request.body, this.context.httpOptions())
            .toPromise()
            .then((response) => {
                console.log('Add Member: ',response.json());
                return response.json();
            })
            .catch(this.utils.catchError);
    }

    leaveGroup(userId, groupId) {
        return this.utils.setTimeoutPromise(1000)
            .then(() => {
                return true;
            })
            .catch(this.utils.catchError);
    }

    promoteToOwner(userId, groupId) {
        return this.utils.setTimeoutPromise(500)
            .then(() => {
                return true;
            })
            .catch(this.utils.catchError);
    }

    promoteAllToOwner(selection) {
        return this.utils.setTimeoutPromise(500)
            .then(() => {
                return true;
            })
            .catch(this.utils.catchError);
    }

    removeFromGroup(userId, groupId) {
        return this.utils.setTimeoutPromise(500)
            .then(() => {
                return true;
            })
            .catch(this.utils.catchError);
    }

    removeAllFromGroup(selection) {
        return this.utils.setTimeoutPromise(500)
            .then(() => {
                return true;
            })
            .catch(this.utils.catchError);
    }

    getGroup(groupId) {
        return this.http.get('')
            .toPromise()
            .then((response) => {
                console.log('response', response);
                return response.json();
            })
            .catch(this.utils.catchError);
    }

    createNewGroup(groupName) {
        let request = environment.create_role(this.context.getUser().id, groupName);

        return this.http.post(request.url, request.body, {
            headers: this.context.httpHeaders()
        })
            .toPromise()
            .then((response) => {
            console.log('Create Group Response: ', response.json().data);
                return response.json().data;
            });
    }


}
