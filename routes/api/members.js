const express = require("express");
const router = express.Router();
const members = require("../../members");
const uuid = require("uuid");

// get members
router.get("/", (req, res) => {
  res.json(members);
});

// get a member
router.get("/:id", (req, res) => {
  const member = members.filter((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (member.length < 1) {
    res.status(400).json({
      msg: "member not found",
    });
  } else {
    res.json(member);
  }
});

// add member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
  };

  if (!newMember.name || !newMember.email) {
    return res.status(417).json({ msg: "please include a name and email" });
  } else {
    members.push(newMember);
    res.json(newMember);
  }
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => {
    return member.id === parseInt(req.params.id);
  });

  if (!found) {
    res.status(400).json({
      msg: "member not found",
    });
  }

  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(417).json({ msg: "please include a name and email" });
  }

  members.forEach((member) => {
    if (member.id === parseInt(req.params.id)) {
      member.name = name;
      member.email = email;
    }
  });

  res.json(members);
});

// delete member
router.delete("/:id", (req, res) => {
  res.json(
    members.filter((member) => {
      return member.id !== parseInt(req.params.id);
    })
  );
});

module.exports = router;
