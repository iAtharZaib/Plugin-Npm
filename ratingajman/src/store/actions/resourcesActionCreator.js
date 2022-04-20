import * as actionTypes from './actionTypes';

const Resources = {
  English: {
    Feedback: 'Feedback',
    Select_language_of_your_feedback: 'Select language of your feedback',
    Continue: 'Continue',
    How_was_your_experience: 'How was your experience?',
    Audio: 'Audio',
    Video: 'Video',
    Text: 'Message',
    Selfie: 'Selfie',
    Your_feedback_must_contain_at_least_6_characters:
      'Your feedback must contain at least 6 characters',
    Message_Feedback: 'Message Feedback',
    Characters: 'Characters',
    Back: 'Back',
    Next: 'Next',
    Audio_Feedback: 'Audio Feedback',
    Seconds: 'Seconds',
    Rerecord: 'Rerecord',
    Record: 'Record',
    Selfie_Feedback: 'Selfie Feedback',
    Capture: 'Capture',
    Retake_Recapture: 'Retake/Re-capture',
    Video_Feedback: 'Video Feedback',
    Add_Attachment: 'Add Attachment',
    Thanks_for_your_feedback: 'Thanks for your feedback',
    Please_rate_us: 'Please rate us',
    Rating: 'Rating',
    We_are_always_happy_to_serve_you: 'We are always happy to serve you',
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      'Thank you for letting us know. Your feedback helps us do better',
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      'We are sorry you had a bad experience. We will try to improve our service',
    Would_you_like_to_attach_any_supporting_documents:
      'Would you like to attach any supporting documents?',
    Skip: 'Skip',
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      'Attachments should be of type .png, .jpg and .PDF and should be less than 5 MBs in size',
    Next_Send: 'Next/Send',
    Upload_file: 'Upload file',
    Remove_Attachment: 'Remove Attachment',
    Submit: 'Submit',
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      'You have reached the daily limit for feedback today. Please visit the app tomorrow to submit more feedbacks.',
    No_microphone_detected: 'No microphone detected',
    No_camera_detected: 'No camera detected',
    No_microphone_and_camera_detected: 'No microphone and camera detected',
    Retry: 'Retry',
    Unable_to_upload_attachments_more_than_5MBs:
      'Unable to upload attachments greater than 5MBs',
    This_feedback_will_be_used_for_quality_assurance_purposes:
      'This feedback will be used for quality assurance purposes',
    View_PDF: 'View PDF',
    Done: 'Done',
    Something_went_wrong_in_sharing_ratings:
      'Something went wrong in sharing ratings',
    Something_went_wrong_in_sharing_image:
      'Something went wrong in sharing image',
    Something_went_wrong_in_sharing_audio:
      'Something went wrong in sharing audio',
    Something_went_wrong_in_sharing_video:
      'Something went wrong in sharing video',
    Something_went_wrong_in_sharing_text:
      'Something went wrong in sharing text feedback',
    Something_went_wrong_in_sharing_attachment:
      'Something went wrong in sharing attachment',
    Please_tap_to_record_the_audio: 'Please tap to record the audio',
    Record_Your_Video: 'Record Your Video',
    Capture_Your_Selfie: 'Capture Your Selfie',
    Enter_Your_Feedback: 'Enter Your Feedback',
    Retake: 'Retake',
    Recapture: 'Re-record',
    No_internet_connection: 'No internet connection',
    Please_record_an_audio_to_proceed: 'Please record an audio to proceed',
    Please_record_a_video_to_proceed: 'Please record a video to proceed',
    Please_take_a_picture_to_proceed: 'Please take a picture to proceed',
    Video_should_be_more_than_5_seconds: 'Video should be more than 5 seconds',
    Audio_should_be_minimum_5_seconds: 'Audio should be minimum 5 seconds',
    charatcters_left: 'characters left',
    Only_png_jpg_and_pdf_files_are_allowed:
      'Only png, jpg and pdf files are allowed',
    Pause: 'Pause',
    Resume: 'Resume',
    English: 'English',
    Urdu: 'Urdu',
    Arabic: 'Arabic',
    Alert: 'Alert',
    Ok: 'Ok',
    Choose_from_gallery:'Choose from gallery',
    Pick_a_document:'Pick a Document',
    Please_select_an_option:"Please select an option"  
  },
  Arabic: {
    Feedback: 'تعليق',
    Select_language_of_your_feedback: 'حدد لغة ملاحظاتك',
    Continue: 'التالي',
    How_was_your_experience: 'كيف كانت تجربتك؟',
    Audio: 'صوتي',
    Video: 'فيديو',
    Text: 'رسالة',
    Selfie: 'صورة/سيلفي',
    Your_feedback_must_contain_at_least_6_characters:
      'يجب أن تحتوي ملاحظاتك على 6 أحرف على الأقل',
    Message_Feedback: 'ملاحظات الرسالة',
    Characters: 'الحروف',
    Back: 'عودة',
    Next: 'التالي',
    Audio_Feedback: 'ردود الفعل الصوتية',
    Seconds: 'ثواني',
    Rerecord: 'إعادة التسجيل',
    Record: 'سجل',
    Selfie_Feedback: 'ملاحظات سيلفي',
    Capture: 'إلتقاط',
    Retake_Recapture: ' استعادة',
    Video_Feedback: 'ردود الفعل على الفيديو',
    Add_Attachment: 'إضافة مرفق',
    Thanks_for_your_feedback: 'شكرا لملاحظاتك',
    Please_rate_us: 'كيف تقيم تجربتك؟',
    Rating: 'تقييم',
    We_are_always_happy_to_serve_you: 'نحن دائما سعداء لخدمتك',
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      'شكرا لك لإخبارنا. تساعدنا ملاحظاتك على القيام بعمل أفضل.',
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      'نحن نأسف لأنك مررت بتجربة سيئة. سنحاول تحسين خدماتنا.',
    Would_you_like_to_attach_any_supporting_documents:
      'هل ترغب في إرفاق أي مستندات داعمة؟',
    Skip: 'تخطي',
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      'يجب أن يكون المرفق من النوع PNG ، و JPG ، و PDF ، ويجب أن يكون الحد الأقصى للحجم أقل من 5 ميجا بايت',
    Next_Send: 'التالي',
    Upload_file: 'اختر ملف',
    Remove_Attachment: 'ازالة المرفق',
    Submit: 'إرسال',
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      'لقد وصلت إلى الحد اليومي للتعليقات اليوم. يرجى زيارة التطبيق غدًا لإرسال المزيد من التعليقات',
    No_microphone_detected: 'لم يتم الكشف عن ميكروفون',
    No_camera_detected: 'لم يتم الكشف عن الكاميرا',
    No_microphone_and_camera_detected: 'لم يتم الكشف عن ميكروفون وكاميرا',
    Retry: 'أعد المحاولة',
    Unable_to_upload_attachments_more_than_5MBs:
      'يتعذر تحميل المرفقات التي يزيد حجمها عن 5 ميغا بايت',
    This_feedback_will_be_used_for_quality_assurance_purposes:
      'سيتم استخدام هذه التعليقات لأغراض ضمان الجودة',
    View_PDF: 'عرض ملف PDF',
    Done: 'تم',
    Something_went_wrong_in_sharing_ratings: 'حدث خطأ ما في مشاركة التقييمات',
    Something_went_wrong_in_sharing_image: 'حدث خطأ ما في مشاركة الصورة',
    Something_went_wrong_in_sharing_audio: 'حدث خطأ ما في مشاركة الصوت',
    Something_went_wrong_in_sharing_video: 'حدث خطأ ما في مشاركة الفيديو',
    Something_went_wrong_in_sharing_text:
      'حدث خطأ ما في مشاركة التعليقات النصية',
    Something_went_wrong_in_sharing_attachment: 'حدث خطأ في مشاركة المرفق',
    Please_tap_to_record_the_audio: 'يرجى النقر لتسجيل الصوت',
    Record_Your_Video: 'سجل الفيديو الخاص بك',
    Capture_Your_Selfie: 'التقط صورتك الذاتية',
    Enter_Your_Feedback: 'أدخل ملاحظاتك',
    Retake: 'إعادة التقاط',
    Recapture: 'إعادة التسجيل',
    No_internet_connection: 'لا يوجد اتصال بالإنترنت',
    Please_record_an_audio_to_proceed: 'يرجى تسجيل الصوت للمتابعة',
    Please_record_a_video_to_proceed: 'الرجاء تسجيل الفيديو للمتابعة',
    Please_take_a_picture_to_proceed: 'يرجى التقاط صورة للمضي قدما',
    Video_should_be_more_than_5_seconds: 'يجب أن يزيد طول الفيديو عن 5 ثانية',
    Audio_should_be_minimum_5_seconds: 'يجب ألا تقل مدة الصوت عن 5 ثانية',
    charatcters_left: 'حرف متبقي',
    Only_png_jpg_and_pdf_files_are_allowed: 'يُسمح فقط بملفات png و jpg و pdf',
    Pause: 'ايقاف مؤقت',
    Resume: 'إعادة تشغيل',
    English: 'الإنجليزية',
    Urdu: 'الأردية',
    Arabic: 'العربية',
    Alert: 'تنبیه',
    Ok: 'تم',
    Choose_from_gallery:'اختر من المعرض',
    Pick_a_document:'اختر مستندًا',
    Please_select_an_option:"الرجاء تحديد خيار"
  },
  Urdu: {
    Feedback: 'اظہار رائے',
    Select_language_of_your_feedback: 'اپنے تاثرات کی زبان منتخب کریں',
    Continue: 'آگے',
    How_was_your_experience: 'آپ کا تجربہ کیسا رہا؟',
    Audio: 'آڈیو ',
    Video: 'ویڈیو',
    Text: 'تحریر',
    Selfie: 'سیلفی',
    Your_feedback_must_contain_at_least_6_characters:
      'آپ کی رائے میں کم از کم 6 حروف ہونے چاہییں ',
    Message_Feedback: 'تحریری رائے',
    Characters: 'حروف',
    Add_Attachment: 'اضافی دستاویزات',
    Back: 'پیچھے',
    Next: 'آگے',
    Audio_Feedback: 'آڈیو رائے',
    Seconds: 'سیکنڈ',
    Rerecord: 'دوبارہ ریکارڈ کریں',
    Record: 'ریکارڈ کریں',
    Selfie_Feedback: 'سیلفی رائے',
    Capture: 'تصویر لیں',
    Retake_Recapture: 'نئی تصویر لیں',
    Video_Feedback: 'ویڈیو رائے ',
    Thanks_for_your_feedback: 'آپکی اظہار رائے کا شکریہ',
    Please_rate_us: 'ہماری سروس کو ریٹ کیجئے',
    Rating: 'ریٹنگ',
    This_feedback_will_be_used_for_quality_assurance_purposes:
      'آپکی راۓ ہماری خدمت کے معیار کو بہتر کرنے کے لئے استعمال کی جائے گی',
    We_are_always_happy_to_serve_you: 'آپکی خدمت ہمارے لئے خوشی کا بائث ہے',
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      'اپنے خیالات سے ہمیں آگاہ کرنے کا شکریہ. آپکی رائے  ہمیں بہتر ہونے میں مدد کرتی ہے.',
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      'ہمیں افسوس ہے کہ آپ کو برا تجربہ ہوا۔ ہم اپنی سروس کو بہتر بنانے کی کوشش کریں گے۔',
    Would_you_like_to_attach_any_supporting_documents:
      'کیا آپ کوئی اضافی دستاویز دینا چاہیں گے؟',
    Skip: 'نظر انداز',
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      'منسلکات .png، .jpg اور .PDF قسم کے ہونے چاہئیں اور ان کا سائز 5 MB سے کم ہونا چاہیے۔',
    Next_Send: 'آگے',
    Upload_file: 'فائل اپلوڈ کریں',
    Remove_Attachment: 'منسلکہ کو ہٹا دیں',
    Submit: 'جمع کردیں',
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      'آپ آج تاثرات کی روزانہ کی حد تک پہنچ گئے ہیں۔ مزید فیڈ بیک جمع کرانے کے لیے براہ کرم کل ایپ ملاحظہ کریں۔',
    No_microphone_detected: 'مائیکروفون نہیں ملا',
    No_camera_detected: 'کیمرہ نہیں ملا',
    No_microphone_and_camera_detected: ' مائیکروفون اور کیمرہ نہیں ملا',
    Retry: 'دوبارہ کوشش کریں',
    Unable_to_upload_attachments_more_than_5MBs:
      '5MBs سے زیادہ منسلکات اپ لوڈ کرنے سے قاصر',
    View_PDF: 'PDF دیکھیں',
    Done: 'ختم',
    Something_went_wrong_in_sharing_ratings:
      'درجہ بندی کا اشتراک کرنے میں کچھ غلط ہو گیا۔',
    Something_went_wrong_in_sharing_image:
      'تصویر شیئر کرنے میں کچھ غلط ہو گیا۔',
    Something_went_wrong_in_sharing_audio:
      'آڈیو کا اشتراک کرنے میں کچھ غلط ہو گیا',
    Something_went_wrong_in_sharing_video:
      'ویڈیو شیئر کرنے میں کچھ غلط ہو گیا۔',
    Something_went_wrong_in_sharing_text:
      'متن کے تاثرات کا اشتراک کرنے میں کچھ غلط ہو گیا۔',
    Something_went_wrong_in_sharing_attachment:
      'منسلکہ کا اشتراک کرنے میں کچھ غلط ہو گیا۔',
    Please_tap_to_record_the_audio: 'آئکن پر کلک کریں',
    Record_Your_Video: 'اپنی ویڈیو ریکارڈ کریں۔',
    Capture_Your_Selfie: 'اپنی سیلفی کیپچر کریں۔',
    Enter_Your_Feedback: 'اپنی رائے درج کریں۔',
    Retake: 'دوبارہ لیں',
    Recapture: 'دوبارہ ریکارڈ کریں۔',
    No_internet_connection: 'انٹرنیٹ کنکشن نہیں ہے۔',
    Please_record_an_audio_to_proceed:
      'آگے بڑھنے کے لیے براہ کرم ایک آڈیو ریکارڈ کریں۔',
    Please_record_a_video_to_proceed:
      'آگے بڑھنے کے لیے براہ کرم ایک ویڈیو ریکارڈ کریں۔',
    Please_take_a_picture_to_proceed:
      'براہ کرم آگے بڑھنے کے لیے ایک تصویر لیں۔',
    Video_should_be_more_than_5_seconds: 'ویڈیو 5 سیکنڈ سے زیادہ ہونی چاہیے۔',
    Audio_should_be_minimum_5_seconds: 'آڈیو کم از کم 5 سیکنڈ کا ہونا چاہیے۔',
    charatcters_left: 'حروف باقی ہیں',
    Only_png_jpg_and_pdf_files_are_allowed:
      'صرف png، jpg اور pdf فائلوں کی اجازت ہے۔',
    Pause: 'آڈیو روک لیجیے',
    Resume: 'آڈیوجاری رکھیں',
    English: 'انگریزی',
    Urdu: 'اردو',
    Arabic: 'عربی',
    Alert: 'تنبیه',
    Ok: 'ٹھیک ہے',
    Choose_from_gallery:'گیلری سے منتخب کریں',
    Pick_a_document:'ایک دستاویز چنیں۔',
    Please_select_an_option:"براہ کرم ایک آپشن منتخب کریں۔"
  },
};

export const setLanguage = id => {
  let langID, resource, langName;
  if (id == 1) {
    langID = 1; 
    langName = 'English';
    resource = Resources.English;
  } else if (id == 2) {
    langID = 2;
    resource = Resources.Arabic; 
    langName = 'Arabic';
  } else {
    langID = 3;
    resource = Resources.Urdu;
    langName = 'Urdu';
  }
  return {
    type: actionTypes.SET_LANGUAGE,
    languageID: langID,
    languageName: langName,
    resource: resource,
  };
};

export const setFeedbackLanguage = id => {
  return {
    type: actionTypes.SET_FEEDBACKID,
    data: id,
  };
};
