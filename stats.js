const PASSING_PERCENTAGE = 67;

function isArray(value) {
    return Array.isArray(value);
}

export function validateQuizData(data) {
    if (!data || typeof data !== 'object' || isArray(data)) {
        return false;
    }

    if (typeof data.quizTitle !== 'string' || data.quizTitle.trim() === '') {
        return false;
    }

    if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0) {
        return false;
    }

    if (!isArray(data.attempts) || data.attempts.length === 0) {
        return false;
    }

    for (const attempt of data.attempts) {
        if (!attempt || typeof attempt !== 'object' || isArray(attempt)) {
            return false;
        }

        if (typeof attempt.name !== 'string' || attempt.name.trim() === '') {
            return false;
        }

        if (!isArray(attempt.answers) || attempt.answers.length !== data.correctAnswers.length) {
            return false;
        }
    }

    return true;
}

export function calculateAttempt(attempt, correctAnswers) {
    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (attempt.answers[i] === correctAnswers[i]) {
            score++;
        }
    }

    const percentage = Math.round((score / correctAnswers.length) * 100);
    const passed = percentage >= PASSING_PERCENTAGE;

    return {
        name: attempt.name.trim(),
        score: score,
        percentage: percentage,
        passed: passed
    };
}

export function calculateReport(data) {
    const attempts = data.attempts.map(attempt => calculateAttempt(attempt, data.correctAnswers));
    
    const participantCount = attempts.length;
    
    const totalPercentage = attempts.reduce((sum, item) => sum + item.percentage, 0);
    const averagePercentage = Math.round(totalPercentage / participantCount);
    
    const passedCount = attempts.filter(item => item.passed).length;

    let best = attempts[0];
    for (let i = 1; i < attempts.length; i++) {
        if (attempts[i].score > best.score) {
            best = attempts[i];
        }
    }

    return {
        quizTitle: data.quizTitle.trim(),
        questionCount: data.correctAnswers.length,
        participantCount: participantCount,
        averagePercentage: averagePercentage,
        passedCount: passedCount,
        threshold: PASSING_PERCENTAGE,
        best: best,
        attempts: attempts
    };
}
