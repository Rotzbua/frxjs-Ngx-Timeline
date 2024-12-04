import {DatePipe, NgClass, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';

import {defaultSupportedLanguageCode, NgxTimelineOrientation, SupportedLanguageCode} from '../../models';
import {NgxTimelineItem, NgxTimelineItemPosition} from '../../models/NgxTimelineEvent';

@Component({
  selector: 'ngx-timeline-event',
  templateUrl: './ngx-timeline-event.component.html',
  styleUrl: './ngx-timeline-event.component.scss',
  imports: [
    NgClass,
    NgTemplateOutlet,
    TitleCasePipe,
  ],
})
export class NgxTimelineEventComponent {
  /**
   * Event to be displayed.
   */
  @Input() event!: NgxTimelineItem;
  /**
   * Event position respect to the vertical line (LEFT or RIGHT).
   */
  @Input() colSidePosition?: NgxTimelineItemPosition;
  /**
   * Language code used to format the dates.
   */
  @Input() langCode: SupportedLanguageCode = defaultSupportedLanguageCode;
  /**
   * Inner custom template used to display the event detail.
   */
  @Input() innerEventCustomTemplate?: TemplateRef<unknown>;
  /**
   * Inner custom template used to display the event description.
   */
  @Input() eventDescriptionCustomTemplate?: TemplateRef<unknown>;
  /**
   * Boolean used to enable or disable the animations.
   */
  @Input() enableAnimation = true;
  /**
   * Orientation of the timeline.
   */
  @Input() orientation: NgxTimelineOrientation = NgxTimelineOrientation.VERTICAL;
  /**
   * Output click event emitter.
   */
  @Output() readonly clickEmitter = new EventEmitter<NgxTimelineItem>();

  ngxTimelineItemPosition = NgxTimelineItemPosition;
  ngxTimelineOrientation = NgxTimelineOrientation;

  private readonly monthAbbr = 'MMM';
  private readonly dayFormat = 'dd';

  getDateObj(): { day: unknown, month: unknown, year: unknown } {
    let day = undefined;
    let month = undefined;
    let year = undefined;
    const dateTimestamp = this.event?.eventInfo?.timestamp;
    if (dateTimestamp) {
      const timestamp = new Date(dateTimestamp);
      const langCode = this.getLangCode();
      month = new DatePipe(langCode).transform(timestamp, this.monthAbbr);
      day = new DatePipe(langCode).transform(timestamp, this.dayFormat);
      year = timestamp.getFullYear();
    }

    return {day, month, year};
  }

  protected getLangCode(): SupportedLanguageCode {
    return this.langCode;
  }
}
