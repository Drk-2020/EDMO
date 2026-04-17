import { LightningElement, api, wire } from 'lwc';
import getLatestScore from '@salesforce/apex/EnrollmentScoreController.getLatestScore';

export default class EnrollmentScoreCard extends LightningElement {
    @api recordId;
    score;

    @wire(getLatestScore, { contactId: '$recordId' })
    wiredScore({ error, data }) {
        if (data) {
            this.score = data;
        } else {
            this.score = null;
        }
    }

    get badgeClass() {
        if (!this.score) return '';

        if (this.score.Score__c >= 75) return 'red';
        if (this.score.Score__c >= 40) return 'orange';
        return 'blue';
    }
}