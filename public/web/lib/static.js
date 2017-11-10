$(document).ready(function () {
  /**
   * Video Pause all
   */
  $("audio").on("play", function () {
    var id = $(this).attr('id');

    $("audio").not(this).each(function (index, audio) {
      audio.pause();
    });
  });

  $("video").on("play", function () {
    var id = $(this).attr('id');

    $("video").not(this).each(function (index, video) {
      video.pause();
    });
  });
  $("#moreinfobtn").click(function () {
    if ($('.moreinfobox').is(':visible')) {
      $('.moreinfobox').slideUp('fast');
    } else {
      $('.moreinfobox').slideDown('fast');
    }
  });
  $('body').on('click', 'video', function (e) {
    if ($(this).get(0).paused) {
      $(this).get(0).play();
    } else {
      $(this).get(0).pause();
    }
  })
  $('video').on("ended", function (e) {
    $(this).get(0).load()
  })
  $("#likeModal .close").on('click', function (e) {
    $('#likeModal').hide()
  })
  $(document).on('focus', '.dueDatePicker', function () {
    $(this).datepicker({
        format: 'yyyy/mm/dd'
      })
      .on('changeDate', function (evt) {
        $($(evt.target).find('input')).val(evt.format())
        $('.datepicker').hide()
      });
  });
  LoginModalController.initialize();
  $("video").each(function () {
    $(this).attr('controlsList', 'nodownload');
    //$(this).load();
  });
  var userObj = localStorage.getItem("userObj");
  if (userObj) {
    userObj = JSON.parse(userObj);
    console.log("userObj===", userObj);
    if (userObj.role && userObj.role != "businessAdmin" && window.location.pathname == "/business/dashboard") {
      $(".nav-menu-left ul li:nth-child(1)").addClass('hide');
      $(".nav-menu-left ul li:nth-child(3)").find('a')[0].click();
    }
  }
});
var LoginModalController = {
  tabsElementName: ".logmod__tabs li",
  tabElementName: ".logmod__tab",
  inputElementsName: ".logmod__form .input",
  hidePasswordName: ".hide-password",

  inputElements: null,
  tabsElement: null,
  tabElement: null,
  hidePassword: null,

  activeTab: null,
  tabSelection: 0, // 0 - first, 1 - second

  findElements: function () {
    var base = this;

    base.tabsElement = $(base.tabsElementName);
    base.tabElement = $(base.tabElementName);
    base.inputElements = $(base.inputElementsName);
    base.hidePassword = $(base.hidePasswordName);

    return base;
  },

  setState: function (state) {
    var base = this,
      elem = null;

    if (!state) {
      state = 0;
    }

    if (base.tabsElement) {
      elem = $(base.tabsElement[state]);
      elem.addClass("current");
      $("." + elem.attr("data-tabtar")).addClass("show");
    }

    return base;
  },

  getActiveTab: function () {
    var base = this;

    base.tabsElement.each(function (i, el) {
      if ($(el).hasClass("current")) {
        base.activeTab = $(el);
      }
    });

    return base;
  },

  addClickEvents: function () {
    var base = this;

    base.hidePassword.on("click", function (e) {
      var $this = $(this),
        $pwInput = $this.prev("input");

      if ($pwInput.attr("type") == "password") {
        $pwInput.attr("type", "text");
        $this.text("Hide");
      } else {
        $pwInput.attr("type", "password");
        $this.text("Show");
      }
    });

    base.tabsElement.on("click", function (e) {
      var targetTab = $(this).attr("data-tabtar");

      e.preventDefault();
      base.activeTab.removeClass("current");
      base.activeTab = $(this);
      base.activeTab.addClass("current");

      base.tabElement.each(function (i, el) {
        el = $(el);
        el.removeClass("show");
        if (el.hasClass(targetTab)) {
          el.addClass("show");
        }
      });
    });

    base.inputElements.find("label").on("click", function (e) {
      var $this = $(this),
        $input = $this.next("input");

      $input.focus();
    });

    return base;
  },

  initialize: function () {
    var base = this;

    base.findElements().setState().getActiveTab().addClickEvents();
  }
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
