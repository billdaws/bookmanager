window.BENCHMARK_DATA = {
  "lastUpdate": 1775703722036,
  "repoUrl": "https://github.com/billdaws/bookmanager",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "f8fcb143be804d7345e2ffcec78aff67ef4dc070",
          "message": "ci(bench): track bench results over time",
          "timestamp": "2026-04-08T22:56:46-04:00",
          "tree_id": "26470aa30664214cdafe043cf72266f089145e9b",
          "url": "https://github.com/billdaws/bookmanager/commit/f8fcb143be804d7345e2ffcec78aff67ef4dc070"
        },
        "date": 1775703461383,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 225340,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 225340,
            "unit": "ns/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1655259,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1655259,
            "unit": "ns/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16811433,
            "unit": "ns/op\t 5900180 B/op\t   80036 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16811433,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900180,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3245641,
            "unit": "ns/op\t  142672 B/op\t    1261 allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3245641,
            "unit": "ns/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142672,
            "unit": "B/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31522037,
            "unit": "ns/op\t  711862 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31522037,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711862,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300451486,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300451486,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10804041,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10804041,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.489,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.489,
            "unit": "ns/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1938010,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1938010,
            "unit": "ns/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1468180,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1468180,
            "unit": "ns/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 532034,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 532034,
            "unit": "ns/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1536308,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1536308,
            "unit": "ns/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5623976,
            "unit": "ns/op\t 5224357 B/op\t   31899 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5623976,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224357,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47158287,
            "unit": "ns/op\t47387419 B/op\t  316308 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47158287,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387419,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 407662098,
            "unit": "ns/op\t577848709 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 407662098,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848709,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264344101,
            "unit": "ns/op\t577839494 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264344101,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577839494,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "4f473b59a91d8495c2bd99158915f7b1971ae496",
          "message": "fix(e2e): use shared connection for in-memory db",
          "timestamp": "2026-04-08T23:01:04-04:00",
          "tree_id": "8924b42492155a74028d3049299064bcd86eeb5f",
          "url": "https://github.com/billdaws/bookmanager/commit/4f473b59a91d8495c2bd99158915f7b1971ae496"
        },
        "date": 1775703721217,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 232640,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 232640,
            "unit": "ns/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5175 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1995099,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1995099,
            "unit": "ns/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "598 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 21156282,
            "unit": "ns/op\t 5900168 B/op\t   80036 allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 21156282,
            "unit": "ns/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900168,
            "unit": "B/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "57 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 2565162,
            "unit": "ns/op\t  136330 B/op\t    1261 allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 2565162,
            "unit": "ns/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 136330,
            "unit": "B/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "430 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 30395598,
            "unit": "ns/op\t  711861 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 30395598,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711861,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 289836470,
            "unit": "ns/op\t 6840918 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 289836470,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840918,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 12485497,
            "unit": "ns/op\t 5900194 B/op\t   80036 allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 12485497,
            "unit": "ns/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900194,
            "unit": "B/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "96 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.178,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.178,
            "unit": "ns/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "550491352 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1870073,
            "unit": "ns/op\t 1194934 B/op\t   30006 allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1870073,
            "unit": "ns/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194934,
            "unit": "B/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "643 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1378057,
            "unit": "ns/op\t 1043056 B/op\t   20008 allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1378057,
            "unit": "ns/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043056,
            "unit": "B/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "878 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 747321,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 747321,
            "unit": "ns/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "1816 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1475428,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1475428,
            "unit": "ns/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "768 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5737781,
            "unit": "ns/op\t 5224220 B/op\t   31899 allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5737781,
            "unit": "ns/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224220,
            "unit": "B/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "214 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 46453841,
            "unit": "ns/op\t47387840 B/op\t  316309 allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 46453841,
            "unit": "ns/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387840,
            "unit": "B/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316309,
            "unit": "allocs/op",
            "extra": "24 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 441110126,
            "unit": "ns/op\t577848458 B/op\t 3160406 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 441110126,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848458,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160406,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 293338712,
            "unit": "ns/op\t577833630 B/op\t 3160394 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 293338712,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577833630,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160394,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          }
        ]
      }
    ]
  }
}