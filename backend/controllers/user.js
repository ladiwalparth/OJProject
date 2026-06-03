async function handleGetVerdict(req, res) {
  try {
    const { code, id, language = "cpp" } = req.body;
    const userWhoSubmitted = req.user;

    const testcase = await Testcase.findOne({ problemCode: id });
    const problem = await Problem.findOne({ code: id });
    const fullUser = await user.findOne({ userId: userWhoSubmitted.id });
    if (!testcase || !problem) return res.status(404).json({ verdict: "Error", detail: "Problem not found" });

    const compilerRes = await axios.post(
      `${process.env.COMPILER_URL}/getVerdict`,
      { language, testcase, code },
      { withCredentials: true }
    );

    const result = compilerRes.data;          // { verdict, failedCase?, detail? }
    try {
      await Submission.create({
        problem: problem.name,
        problemCode: id,
        verdict: result.verdict || "Error",
        language,
        code,
        submitted_by: fullUser._id,
      });
    } catch (e) { console.log("submission save error:", e); }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error?.response?.data || error.message);
    return res.status(500).json({ verdict: "Error", detail: "Error contacting compiler" });
  }
}