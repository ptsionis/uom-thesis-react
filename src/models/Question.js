export class Question {
  constructor(
    id,
    question,
    category,
    level,
    answer1,
    answer2,
    answer3,
    answer4,
    correctId
  ) {
    this.id = id;
    this.question = question;
    this.category = category;
    this.level = level;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctId = correctId;
  }
}
