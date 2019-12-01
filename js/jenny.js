// smooth scroll
$('a[href*="#"]').on('click', function(e) {
  e.preventDefault()

$('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top,
  }, 1000, 'swing')
});

$(function() {
  // for Under Construction message
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 0) {
       $('#version-id').addClass('small');
    } else {
       $('#version-id').removeClass('small');
    }
  });

  // for toggleStudentTeacher
  $('.studentsCan').addClass('canActive');
  $('.teachersCan').addClass('canInactive');
  $('.studentsCanExplained').addClass('explainedActive');
  $('.teachersCanExplained').addClass('explainedInactive');

  $('.teachersCan').on('click', function() {
    // change tab state
    $('.studentsCan').removeClass('canActive');
    $('.teachersCan').removeClass('canInactive');
    $('.teachersCan').addClass('canActive');
    $('.studentsCan').addClass('canInactive');

    // change content state
    $('.studentsCanExplained').removeClass('explainedActive');
    $('.teachersCanExplained').removeClass('explainedInactive');
    $('.teachersCanExplained').addClass('explainedActive');
    $('.studentsCanExplained').addClass('explainedInactive');
  });

  $('.studentsCan').on('click', function() {
    // change tab state
    $('.teachersCan').removeClass('canActive');
    $('.studentsCan').removeClass('canInactive');
    $('.studentsCan').addClass('canActive');
    $('.teachersCan').addClass('canInactive');

    // change content state
    $('.teachersCanExplained').removeClass('explainedActive');
    $('.studentsCanExplained').removeClass('explainedInactive');
    $('.studentsCanExplained').addClass('explainedActive');
    $('.teachersCanExplained').addClass('explainedInactive');
  });



  // toggle points
  $('.point h2').on('click', function() {
    var currentPoint = $(this).parent();
    $(currentPoint).find("p").slideToggle();

    $(currentPoint).siblings().find("p").slideUp();
  });

    // // toggle points
    // $('.point').on('click', function() {
    //   $(this).find("p").slideToggle();
    //
    //   $(this).siblings().find("p").slideUp();
    // });

});
